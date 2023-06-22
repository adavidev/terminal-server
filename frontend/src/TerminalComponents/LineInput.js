import React, { useRef, useEffect, useState } from 'react';
import Cursor from '../cursor'
import { Input } from './ThemedStyles'
import { useSelector } from 'react-redux'

const LineInput = ({ doneCallback }) => {
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);
  const [theme] = useSelector((state) => [state.theme])

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!disabled) {
        inputRef.current.focus();
        e.preventDefault();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Input
        {...theme}
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
