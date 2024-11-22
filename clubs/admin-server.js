// In your server.js file (Backend)
const express = require('express');
const router = express.Router();

// Admin login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await global.pool.getConnection();
    const query = 'SELECT * FROM users WHERE email = ? AND password = ? AND role = "president"';
    const [results] = await connection.query(query, [email, password]);

    if (results.length > 0) {
      req.session.role = results[0].role;
      req.session.club_id = results[0].club_id;
      console.log('Session set:', req.session); // Debugging line
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
router.get('/club-members', async (req, res) => {
  console.log('Session data:', req.session); // Debugging line
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

module.exports = router;
