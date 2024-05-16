const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the "public" and "assets" directories
app.use(express.static('./public'));
app.use(express.static('./assets'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
