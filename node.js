const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'quiz_app'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Connected to MYSQL database');
});

db.query(`CREATE TABLE IF NOT EXISTS quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    image VARCHAR(255)
)`,(err, result) => {
    if(err) throw err;
    console.log('Quix table created successfully!');
});

app.get('/quizzes', (req, res) => {
    db.query('SELECT * FROM quizzes', (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving quizzes');
        } else {
            res.json(result);
        }
    });
});

app.post('/quizzes', (req, res) => {
    const { question, image } = req.body;
    db.query('INSERT INTO quizzes (question, image) VALUES (?, ?)', [question, image], (err, result) => {
        if (err) {
            res.status(500).send('Error creating quiz');
        } else {
            res.sendStatus(200);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});