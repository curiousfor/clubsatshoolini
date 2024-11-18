const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();
const port = 1000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); 


app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (for form submissions)

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Connect to MySQL Database
async function connectToDatabase() {
  try {
    const pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "mysql9199", // Replace with your actual password
      database: "user_data",
    });

    console.log("Connected to MySQL database");
    global.pool = pool; // Make the pool globally accessible
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit the application if the database connection fails
  }
}

connectToDatabase();

// Handle form submission
app.post("/process_registration", async (req, res) => {
  const { name, course, semester, mobileNumber, email, Club} = req.body;

  try {
    // Get a database connection from the pool
    const connection = await global.pool.getConnection();

    // Insert data into the database
    const query =
      "INSERT INTO Students (Name, Course, Semester, MobileNumber, Email, Club) VALUES (?, ?, ?, ?, ?, ?)";
    const [results] = await connection.query(query, [
      name,
      course,
      parseInt(semester, 10), // Ensure semester is an integer
      mobileNumber,
      email,
      Club,
    ]);

    console.log("Data inserted successfully:", results);
    res.status(200).send("Registration successful!");

    // Release the connection back to the pool
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
