const socketIO = require('socket.io');
const { Server } = require("socket.io");

module.exports = {
  socketServer: (server) => {
    // Create the WebSocket server
    const io = new Server(server);

    const activeTerminals = [];

    function broadcastMessage(message, recipient) {
      if (recipient === 'all') {
        console.log("emitting to all: ", message)
        io.emit('motherMessage', message); // Broadcast to all connected clients
      } else {
        console.log(`emitting to ${recipient}:` , message)
        io.to(recipient).emit('motherMessage', message); // Broadcast to a specific client
      }
    }

    io.on('connection', (socket) => {
      console.log(`connect ${socket.id}`);

      // Add the connected user to the activeTerminals array
      activeTerminals.push(socket.id);

      // Emit the updated connected clients list to all clients
      io.emit('clients', activeTerminals);

      socket.on('motherMessage', ({ message, recipient, senderInfo }) => {
        // Handle the received message here
        // You can perform any necessary logic, such as routing the message to the appropriate recipients
        console.log('Message:', message);

        // Example: Broadcast the message to the intended recipient(s)
        broadcastMessage({ message, senderInfo }, recipient || 'all');
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
        console.log('clientMessage: ', message);
        // Example: Echo the message back to the sender
        // socket.emit('message', message);
        io.emit('clientMessage', { message, senderInfo });
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
  },
};
