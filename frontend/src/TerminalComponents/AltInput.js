import React, { useState } from 'react';

const VerificationComponent = ({ memory }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'input1') {
      setInput1(value);
    } else if (name === 'input2') {
      setInput2(value);
    }
  };

  const handleVerification = () => {
    const foundObject = memory.find((obj) => obj.key1 === input1 && obj.key2 === input2);
    if (foundObject) {
      console.log('Pass');
      // Perform any pass logic here
    } else {
      console.log('Fail');
      // Perform any fail logic here
    }
  };

  return (
    <div>
      <input
        type="text"
        name="input1"
        value={input1}
        onChange={handleInputChange}
        placeholder="Input 1"
      />
      <input
        type="text"
        name="input2"
        value={input2}
        onChange={handleInputChange}
        placeholder="Input 2"
      />
      <button onClick={handleVerification}>Verify</button>
    </div>
  );
};

export default VerificationComponent;
