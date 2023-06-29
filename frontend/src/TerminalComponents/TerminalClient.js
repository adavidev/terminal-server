import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const TerminalClient = ({ name }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [connected, setConnected] = useState(fase);

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
      socket.emit('registerTerminal', name); // Replace 'terminal1' with the appropriate terminal ID

      socket.on("connect", () => {
        console.log(socket.connected); // true
        setConnected(true)
      });

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
      
    </div>
  );
};

export default TerminalClient;
