import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const MotherClient = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [connectedClients, setConnectedClients] = useState([]);

  useEffect(() => {
    // Establish a connection to the backend websocket server
    const newSocket = io('http://localhost:5001'); // Replace with your backend URL

    // Save the socket instance in state
    setSocket(newSocket);

    // Clean up the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages from the server
      socket.on('message', (message) => {
        setReceivedMessages((prevMessages) => [...prevMessages, message]);
      });

      // Listen for updates to the connected clients list
      socket.on('clients', (clients) => {
        setConnectedClients(clients);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      // Emit a 'message' event to the server with the message content
      socket.emit('clientMessage', { message });

      // Clear the input field after sending the message
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {receivedMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h3>Connected Clients:</h3>
        <ul>
          {connectedClients.map((client, index) => (
            <li key={index}>{client}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MotherClient;
