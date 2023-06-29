import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

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
    <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: '0px',
          left: '0px',
          color: config.styles.color // Set color for pseudo-element to inherit
        }}>
      {showImage && (
        <div style={{
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          width: '100%',
          height: '100%',
          position: 'relative' // Needed to position pseudo-element
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: config.styles.color, // Inherit color from parent element
            opacity: 0.3 // Adjust opacity to achieve desired tint intensity
          }}></div>
        </div>
      )}
    </div>
  );
};
