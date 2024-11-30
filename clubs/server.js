const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");
const path = require("path");
const session = require("express-session");
const nodemailer = require("nodemailer"); // Import Nodemailer

const app = express();
const port = 1000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname)));

app.use(
  session({
    secret: "secret-key", // Use a more secure key in production
    resave: false,
    saveUninitialized: true,
  })
);

// Connect to MySQL Database
async function connectToDatabase() {
  try {
    const pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "mysql9199",
      database: "user_data",
    });

    console.log("Connected to MySQL database");
    global.pool = pool; // Make the pool accessible globally
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
}

connectToDatabase();

// Handle form submission for student registration
app.post("/process_registration", async (req, res) => {
  const { name, course, semester, mobileNumber, email, Club } = req.body;

  try {
    const connection = await global.pool.getConnection();

    // Insert into the 'students' table
    const query =
      "INSERT INTO students (Name, Email, Course, Semester, MobileNumber, Club) VALUES (?, ?, ?, ?, ?, ?)";
    const [results] = await connection.query(query, [
      name,
      email,
      course,
      semester,
      mobileNumber,
      Club,
    ]);

    console.log("Data inserted successfully:", results);

    // Redirect to success page
    res.redirect("/registration-success.html");

    // After redirect, send an email asynchronously
    sendSuccessEmail(); // Call email-sending function

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

// Function to send email
function sendSuccessEmail() {
  // Create a transporter object with your email service details
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service (Gmail in this example)
    auth: {
      user: "clubsatshoolini@gmail.com", // Your email
      pass: "pxxz voul bbxf khgd", // Your email password (use environment variables in production)
    },
  });

  // Define the email options
  const mailOptions = {
    from: "clubsatshoolini@gmail.com",
    to: "", // Manually set recipient
    subject: "New Club Registration",
    text: "A new student has successfully registered for a club. Check the details in the admin panel.",
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
}

// Serve admin page (from the 'public' folder)
app.get("/admin-page.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin-page.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
