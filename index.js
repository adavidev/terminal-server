const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { User, Terminal, Link } = require('./models/models.js');

const app = express();
app.use(express.json());

// Serve the React app
app.use(express.static(__dirname + '/frontend/build'));

// Serve the index.html file for all non-API routes
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(__dirname + '/frontend/build/index.html');
});


// Use port from Heroku, fall back to default port
const port = process.env.PORT || 3000;

app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/api/terminals', async (req, res) => {
  const terminals = await Terminal.findAll();
  res.json(terminals);
});

app.get('/api/links', async (req, res) => {
  const links = await Link.findAll();
  res.json(links);
});

app.post('/api/links', async (req, res) => {
  try {
    const { terminalId } = req.body;

    // Generate a UUID for the Link name
    const linkName = uuidv4();

    // Find the Terminal based on the provided terminalId
    const terminal = await Terminal.findOne({ where: { id: terminalId } });

    if (!terminal) {
      return res.status(404).json({ error: 'Terminal not found' });
    }

    // Create the Link with the generated name and associated Terminal
    const link = await Link.create({ name: linkName, resource: terminal });

    res.status(201).json(link);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new Terminal
app.post('/api/terminals', async (req, res) => {
  try {
    const { config } = req.body;

    // Create the Terminal with the provided config
    const terminal = await Terminal.create({ config });

    res.status(201).json(terminal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Access the Terminal object associated with the Link
app.get('/api/links/:name', async (req, res) => {
  try {
    const { name } = req.params;

    // Find the Link based on the provided name
    const link = await Link.findOne({ where: { name } });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    // Get the associated Terminal for the Link
    const terminal = await Terminal.findByPk(link.terminalId);

    if (!terminal) {
      return res.status(404).json({ error: 'Terminal not found' });
    }

    res.status(200).json(terminal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`App available at http://localhost:${port}`);
});
