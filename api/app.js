const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Để xử lý JSON payload

// Create connection to MySQL database
const db = mysql.createConnection({
  host: '0.tcp.ap.ngrok.io',
  user: 'root',
  password: '',
  database: 'boc',
  port: 17232,
  connectTimeout: 30000
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Received POST /api/login with data:', { username, password });

  db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log('Database query result:', result);

    if (result.length > 0) {
      res.send("Ban da dang nhap thanh cong");
    } else {
      res.send("Ban da dang nhap that bai");
    }
  });
});

module.exports = app;
