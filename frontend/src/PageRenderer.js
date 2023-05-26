import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [html, setHtml] = useState('');
  const [config, setconfig] = useState('World');

  const handleButtonClick = async () => {
    const response = await axios.get('terminal.htm');
    const renderedHtml = response.data.replace('{{config}}', config);
    const newWindow = window.open();
    newWindow.document.write(renderedHtml);
  };

  return (
    <div>
      <input value={config} onChange={(e) => setconfig(e.target.value)} />
      <button onClick={handleButtonClick}>Render HTML</button>
    </div>
  );
}

export default App;
