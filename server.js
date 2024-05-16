const express = require('express');
const path = require('path');
const mysql = require('mysql');


const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "assets" directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Mount the API routes
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
