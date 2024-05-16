const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');


// Khởi tạo biến app trước khi sử dụng nó
const app = express();

app.use(express.static('./public'));
app.use(express.static('./assets'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create connection to MySQL database
const db = mysql.createConnection({
    host: '0.tcp.ap.ngrok.io',
    user: 'root',
    password: '',
    database: 'boc',
    port: 17232
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

// Export module sau khi app đã được khởi tạo
module.exports = app;

// Khởi động server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


