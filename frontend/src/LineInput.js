import React, { useRef, useEffect, useState } from 'react';
import Cursor from './cursor'

const LineInput = ({ doneCallback }) => {
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleKeyPress = (event) => {
    setInputWidth(Math.max(event.target.value.length, 0));
    if (event.key === 'Enter') {
      setDisabled(true);
      doneCallback(event.target.value);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        style={{ 
          background: 'none', 
          border: 'none', 
          outline: 'none', 
          cursor: 'none', 
          fontSize: 'inherit',
          width: `${inputWidth + 1}ch`,
          caretColor: 'transparent',
        }}
        onKeyDown={handleKeyPress}
        disabled={disabled}
      />
      <Cursor disabled={disabled} />
    </>
  );
};

export default LineInput;
