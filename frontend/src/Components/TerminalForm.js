import React, { useState } from 'react';
import axios from 'axios';

const TerminalForm = () => {
  const [config, setConfig] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to create the Terminal
      const response = await axios.post('/api/terminals', { config });

      // Handle success, e.g., show a success message or perform any necessary actions
      console.log('Terminal created:', response.data);

      // Reset the form after successful submission
      setConfig('');
    } catch (error) {
      // Handle error, e.g., display an error message or perform any necessary actions
      console.error('Error creating Terminal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="config">Config:</label>
        <input
          type="text"
          id="config"
          value={config}
          onChange={(e) => setConfig(e.target.value)}
        />
      </div>
      <button type="submit">Create Terminal</button>
    </form>
  );
};

export default TerminalForm;
