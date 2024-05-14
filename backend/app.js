const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(express.static('public'));
module.exports = app;


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Create connection to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'boc'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.length > 0) {
            res.send("OK");
        } else {
            res.send("KO");
        }
    });
});

app.post('/user', (req, res) => {
    console.log("hqwdshu2qewxcdhnewxdnj");
    res.send('User route accessed');
});


