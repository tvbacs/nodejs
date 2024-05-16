const express = require('express');
const path = require('path');
const apiApp = require('./api/app'); // Import apiApp từ api/app.js

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "assets" directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Mount the API routes
app.use('/api', apiApp);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
