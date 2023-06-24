import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

// Data Item Layout:
// { 
//   "type": "splash",
//   "src": "https://i.imgur.com/htHuumj.png",
//   "delay": 3000
// },

export default ({ doneCallback, options }) => {
  const [pages, memory, config] = useSelector((state) => [state.brain.pages, state.brain.memory, state.brain.config])
  const dispatch = useDispatch()

  const [showImage, setShowImage] = useState(true);
  const {src, delay} = options

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImage(false);
      doneCallback();
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      {showImage && (
        <div style={{
          background: ` 
          linear-gradient(
            ${config.styles.color}30, 
            ${config.styles.color}30
          ),
          url(${src})`,
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: '100vw',
          height: '100vh',
          objectFit: 'contain',
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}></div>
      )}
    </div>
  );
};
