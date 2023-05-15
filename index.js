const express = require('express');
const { User, Terminal } = require('./models.js');

const app = express();
console.log(process.env.DATABASE_URL)

// Use port from Heroku, fall back to default port
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/terminals', async (req, res) => {
  const terminals = await Terminal.findAll();
  res.json(terminals);
});


app.listen(port, () => {
  console.log(`App available at http://localhost:${port}`);
});

