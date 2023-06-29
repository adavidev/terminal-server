import React, { useState, useEffect, memo } from 'react';

const Typewriter = ({ text, doneCallback = () => {} }) => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setTypedText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 50);
    } else {
      timeout = setTimeout(() => {
        doneCallback();
      }, 200);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, text]);

  useEffect(() => {
    setTypedText('');
    setCurrentIndex(0);
  }, [text]);

  return <span>{typedText}</span>;
};

export default memo(Typewriter);
