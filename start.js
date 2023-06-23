const http = require('http');
const { app } = require('./httpServer.js');
const { socketServer } = require('./backend/socketServer');

// Create the HTTP server
const server = http.createServer(app);

// Start the WebSocket server
socketServer(server);

// Start the HTTP server
server.listen(5000, () => {
  console.log(`Server listening on port ${5000}`);
});
