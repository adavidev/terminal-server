import React, { useRef, useEffect } from 'react';

function ScrollableDiv({children}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Function to scroll the div to the bottom
    const scrollToBottom = () => {
      const container = containerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    };

    // Call the scroll function whenever the content changes
    scrollToBottom();
  }, [children]);

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: 'scroll',
        maxHeight: '100%', // Set a maximum height for the div
      }}
    >
      {children}
    </div>
  );
}

export default ScrollableDiv;
