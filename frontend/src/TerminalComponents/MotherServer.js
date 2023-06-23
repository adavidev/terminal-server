import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const clientMessage = ({sendMessage}) => {

}

const MotherServer = ({name = "mum"}) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [connectedClients, setConnectedClients] = useState([]);

  useEffect(() => {
    const newSocket = io();

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('motherMessage', (message) => {
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
      socket.emit('motherMessage', {
        message,
        recipient,
        senderInfo: { id: socket.id, name: name },
      });
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
        <button onClick={() => sendMessage('all')}>Send to All</button>
      </div>
      <div>
        <h3>Connected Clients:</h3>
        <ul>
          {connectedClients.map((client, index) => (
            <li key={index}><button onClick={() => sendMessage(client)}>Send to {client}</button></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MotherServer;
