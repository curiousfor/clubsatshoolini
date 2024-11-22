const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mysql = require("mysql2/promise");
const path = require("path");
const session = require('express-session');

const app = express();
const port = 1000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: 'secret-key', // Use a more secure key in production
  resave: false,
  saveUninitialized: true
}));

async function connectToDatabase() {
  try {
    const pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "mysql9199",
      database: "club_management",
    });

    console.log("Connected to MySQL database");
    global.pool = pool;
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
}

connectToDatabase();

// Handle form submission
app.post("/process_registration", async (req, res) => {
  const { name, course, semester, mobileNumber, email, Club } = req.body;

  try {
    const connection = await global.pool.getConnection();
    const query = "INSERT INTO users (name, email, role, club_id, password) VALUES (?, ?, 'student', (SELECT club_id FROM clubs WHERE club_name = ?), 'password')";
    const [results] = await connection.query(query, [name, email, Club, 'password']); // Adjust to hash password in real implementation

    console.log("Data inserted successfully:", results);
    res.status(200).send("Registration successful!");
    connection.release();
  } catch (error) {
    console.error("Error inserting data:", error);
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).send("Error: Email already registered.");
    } else {
      res.status(500).send("Error saving data to the database.");
    }
  }
});

// Login endpoint for authentication
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const connection = await global.pool.getConnection();
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const [results] = await connection.query(query, [email, password]); // Adjust to hash and compare hashed password

    if (results.length > 0) {
      req.session.role = results[0].role;
      req.session.club_id = results[0].club_id;
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid email or password");
    }
    connection.release();
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login");
  }
});

// Endpoint to get members of a club
app.get('/club-members', async (req, res) => {
  if (req.session.role === 'president') {
    const clubId = req.session.club_id;
    try {
      const connection = await global.pool.getConnection();
      const query = 'SELECT * FROM users WHERE club_id = ? AND role = "student"';
      const [results] = await connection.query(query, [clubId]);

      res.json(results);
      connection.release();
    } catch (error) {
      console.error("Error fetching club members:", error);
      res.status(500).send("Error fetching club members.");
    }
  } else {
    res.status(403).send('Forbidden');
  }
});

// Serve admin page
app.get('/admin-page.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-page.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
