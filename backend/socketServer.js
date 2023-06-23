const socketIO = require('socket.io');
const http = require('http');

module.exports = { socketServer: (app, allowedPorts) => {
    // Create the HTTP server
    const server = http.createServer(app);

    // Create the WebSocket server
    const io = socketIO(server, {
      cors: {
        origin: function (origin, callback) {
          // Allow requests without an origin header
          if (!origin) {
            return callback(null, true);
          }

          const requestedPort = parseInt(origin.split(':')[2], 10);

          if (allowedPorts.includes(requestedPort)) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        methods: ['GET', 'POST'],
      },
    });
    const activeTerminals = [];

    function broadcastMessage(message, recipient) {
      if (recipient === 'all') {
        io.emit('message', message); // Broadcast to all connected clients
      } else {
        io.to(recipient).emit('message', message); // Broadcast to a specific client
      }
    }

    io.on('connection', (socket) => {
      console.log(`connect ${socket.id}`);

      // Add the connected user to the activeTerminals array
      activeTerminals.push(socket.id);

      // Emit the updated connected clients list to all clients
      io.emit('clients', activeTerminals);

      socket.on('message', ({ message, recipient, senderInfo }) => {
        // Handle the received message here
        // You can perform any necessary logic, such as routing the message to the appropriate recipients
        console.log('Message:', message);

        // Example: Broadcast the message to the intended recipient(s)
        broadcastMessage({message, senderInfo}, recipient);
      });

      socket.on('registerTerminal', (terminalId) => {
        console.log(`Terminal registered: ${terminalId}`);

        // Store the terminal ID and associated socket
        activeTerminals[terminalId] = socket;

        // Notify other clients about the updated list of active terminals
        io.emit('activeTerminals', Object.keys(activeTerminals));
      });

      socket.on('clientMessage', ({ message, senderInfo }) => {
        // Handle the received message here
        // You can perform any necessary logic, such as routing the message to the appropriate recipients
        console.log("clientMessage: ", message)
        // Example: Echo the message back to the sender
        // socket.emit('message', message);
        io.emit('clientMessage', {message, senderInfo});
      });

      socket.on('disconnect', (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);

        // Remove the disconnected user from the activeTerminals array
        const index = activeTerminals.indexOf(socket.id);
        if (index !== -1) {
          activeTerminals.splice(index, 1);
        }

        // Emit the updated connected clients list to all clients
        io.emit('clients', activeTerminals);
      });
    });

    // Use port from Heroku, fall back to default port
    const port2 = Number(process.env.PORT) + 1 || 3456;

    // Start the server
    server.listen(port2, () => {
      console.log(`Websocket Server available at http://localhost:${port2}`);
    });
  }
}