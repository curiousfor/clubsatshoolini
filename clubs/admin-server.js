const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql9199',
    database: 'user_data'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL');
});

// Serve the HTML file directly
app.use(express.static(__dirname));

// Root route to serve a default message or redirect
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/admin-page.html');
});

// Route to get club members for a specific president (protected route)
app.get('/club-members', (req, res) => {
    const { email, password } = req.query;

    const queryPresident = 'SELECT * FROM presidents WHERE Email = ? AND Password = ?';
    db.query(queryPresident, [email, password], (err, presidentResults) => {
        if (err) {
            console.error('Error fetching president:', err.message);
            res.status(500).send('Error fetching president');
            return;
        }

        if (presidentResults.length === 0) {
            res.status(403).send('Unauthorized: Invalid email or password');
            return;
        }

        const club = presidentResults[0].Club;
        const queryMembers = 'SELECT * FROM students WHERE Club = ?';
        db.query(queryMembers, [club], (err, memberResults) => {
            if (err) {
                console.error('Error fetching club members:', err.message);
                res.status(500).send('Error fetching club members');
                return;
            }
            res.json(memberResults);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
