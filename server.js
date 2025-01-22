const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const sql = 'INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).send('Error registering user: ' + err.message);
        }
        res.status(201).send('User registered successfully');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', username);

    const sql = 'SELECT * FROM Users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.log('Error querying database:', err);
            return res.status(500).send('Error logging in: ' + err.message);
        }
        if (results.length === 0) {
            console.log('User not found');
            return res.status(401).send('User not found');
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).send('Invalid password');
        }

        console.log('Login successful for user:', username);
        res.send('Login successful');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing
module.exports = app;
