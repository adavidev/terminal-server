import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const MotherClient = ({name = "Jerry"}) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [connectedTerminals, setConnectedTerminals] = useState([]);

  useEffect(() => {
    let serverURL;

    if (window.location.hostname === 'localhost') {
      serverURL = `${window.location.protocol}//${window.location.hostname}:5001`; // Use current protocol and hostname without the port
    } else {
      serverURL = `${window.location.hostname}:5001`; // Specify the port if needed
    }

    const newSocket = io(serverURL);

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
      socket.on('message', (message) => {
        setReceivedMessages((prevMessages) => [...prevMessages, message]);
      });
  
      // Listen for updates to the list of active terminals
      socket.on('activeTerminals', (activeTerminals) => {
        setConnectedTerminals(activeTerminals);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages from the server
      // socket.on('message', (message) => {
      //   setReceivedMessages((prevMessages) => [...prevMessages, message]);
      // });

      // Listen for updates to the connected clients list
      socket.on('clients', (clients) => {
        setConnectedTerminals(clients);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      // Emit a 'message' event to the server with the message content
      socket.emit('clientMessage', { message, senderInfo: {id: socket.id, name: name} });

      // Clear the input field after sending the message
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {receivedMessages.map((msg, index) => (
          <p key={index}><strong>{msg.senderInfo.name}: </strong>{msg.message}</p>
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
    </div>
  );
};

export default MotherClient;
