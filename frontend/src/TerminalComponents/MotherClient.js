import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const MotherClient = ({ name = 'Jerry' }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [connectedTerminals, setConnectedTerminals] = useState([]);

  useEffect(() => {
    const newSocket = io();

    setSocket(newSocket);

    // Clean up the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Register the terminal ID with the server
      socket.emit('registerTerminal', 'terminal1'); // Replace 'terminal1' with the appropriate terminal ID

      // Listen for incoming messages from the server
      socket.on('clientMessage', (message) => {
        setReceivedMessages((prevMessages) => [...prevMessages, message]);
      });

      // Listen for incoming messages from the server
      socket.on('motherMessage', (message) => {
        setReceivedMessages((prevMessages) => [...prevMessages, message]);
      });

      // Listen for updates to the list of active terminals
      socket.on('activeTerminals', (activeTerminals) => {
        setConnectedTerminals(activeTerminals);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      // Emit a 'clientMessage' event to the server with the message content
      socket.emit('clientMessage', {
        message,
        senderInfo: { id: socket.id, name: name },
      });

      // Clear the input field after sending the message
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {receivedMessages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.senderInfo.name}: </strong>
            {msg.message}
          </p>
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
      {/* <div>
        <h3>Connected Clients:</h3>
        <ul>
          {connectedTerminals.map((client, index) => (
            <li key={index}>{client}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default MotherClient;
