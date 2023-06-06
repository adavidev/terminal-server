import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TerminalList = () => {
  const [terminals, setTerminals] = useState([]);

  useEffect(() => {
    fetchTerminals();
  }, []);

  const fetchTerminals = async () => {
    try {
      const response = await fetch('/api/terminals');
      console.log(response)
      const data = await response.json();
      setTerminals(formatTerminals(data));
    } catch (error) {
      console.error(error);
    }
  };

  const formatTerminals = (data) => {
    return data.map((terminal) => {

      const config = JSON.parse(terminal.config)
      return {
        ...terminal,
        config
      }
    })
  }

  console.log(terminals[0])

  return (
    <div>
      <h2>List of Terminals</h2>
      {terminals.map((terminal) => (
        <div key={terminal.id}>
          <h3>Name: {terminal.config.config.name}</h3>
          <div>
            {terminal.Links.map((Link) => (
                <>
                  Shareable Link:{' '}
                  <a href={`/viewer/${Link.name}`} target="_blank" rel="noopener noreferrer">
                    {Link.name}
                  </a>
                </>
              )
            )}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default TerminalList;
