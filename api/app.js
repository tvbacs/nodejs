const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Create connection to MySQL database
const db = mysql.createConnection({
  host: '0.tcp.ap.ngrok.io',
  user: 'root',
  password: '',
  database: 'boc',
  port: 17722
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.post('/api/login', (req, res) => {
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

app.post('/api/user', (req, res) => {
  console.log("User route accessed");
  res.send('User route accessed');
});

module.exports = app;
