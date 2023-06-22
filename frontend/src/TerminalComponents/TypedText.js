import React, { useState, useEffect, memo } from 'react';

const Typewriter = ({ text, doneCallback = () => {} }) => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setTypedText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 50);
  
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        doneCallback();
      }, 200);
    }
  }, [currentIndex, text]);

  return <span>{typedText}</span>;
};

export default memo(Typewriter);