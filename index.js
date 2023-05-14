// index.js

const express = require('express');
const app = express();

// Use port from Heroku, fall back to default port
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App available at http://localhost:${port}`);
});