const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { User, Terminal, Link } = require('./models/models.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

app.post('api/login', async (req, res) => {

  // Inside the user login route handler
  const { email, password } = req.body;

  // Retrieve the user's hashed password from the database based on their email
  const user = await User.findOne({ where: { email } });

  if (!user) {
    // Handle user not found
    return res.status(404).json({ error: 'User or Password did not match.' });
  }

  const storedHashedPassword = user.password;

  // Compare the entered password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

  if (passwordMatch) {
    // Passwords match, proceed with user authentication

    // Generate and sign a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key');

    // Send the token back to the client
    res.json({ token });
  } else {
    // Passwords don't match, handle incorrect password
    return res.status(404).json({ error: 'User or Password did not match.' });
  }

})

app.post('/api/users', async (req, res) => {
  try {
    const saltRounds = 10; // Number of salt rounds (recommended value: 10)

    // Inside the user registration route handler
    const { firstName, lastName, email, password } = req.body;

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store the hashed password in the database
    await User.create({ firstName, lastName, email, password: hashedPassword });

    res.status(201).json({ success: 'User created.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/api/terminals', async (req, res) => {
  try {
    const terminals = await Terminal.findAll({
      include: {
        model: Link,
        attributes: ['name'],
      },
    });

    res.json(terminals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
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

    const linkName = uuidv4();
    const link = await Link.create({ name: linkName, TerminalId: terminal.id });
    console.log(link)
    console.log(terminal)

    res.status(201).json({terminal, link});
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
    const terminal = await Terminal.findByPk(link.TerminalId);

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
