import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const MotherServer = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [connectedClients, setConnectedClients] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:5001');

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setReceivedMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on('clientMessage', (message) => {
        setReceivedMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on('connect', () => {
        // Update the connected clients list when a user connects
        socket.emit('getClients');
      });

      socket.on('clients', (clients) => {
        setConnectedClients(clients);
      });

      socket.on('disconnect', () => {
        // Update the connected clients list when a user disconnects
        setConnectedClients([]);
      });
    }
  }, [socket]);

  const sendMessage = (recipient) => {
    if (message.trim() !== '') {
      socket.emit('message', { message, recipient });
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
        <button onClick={() => sendMessage('all')}>Send to All</button>
        <button onClick={() => sendMessage('client1')}>Send to Client 1</button>
        <button onClick={() => sendMessage('client2')}>Send to Client 2</button>
        {/* Add more buttons for other clients as needed */}
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

export default MotherServer;
