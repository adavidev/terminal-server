import React, { useState, useEffect, useRef } from 'react';

const JournalEntry = ({ text, pageHeight, pageWidth }) => {
  const containerRef = useRef(null); // Reference to the container element

  const [visibleText, setVisibleText] = useState(''); // Text visible on the current page
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  useEffect(() => {
    // Calculate the number of characters that fit within the page dimensions
    const calculateVisibleText = () => {
      const container = containerRef.current;
      const containerHeight = container.clientHeight;
      const containerWidth = container.clientWidth;
      const fontSize = 24; // Adjust the font size as per your requirement

      const charsPerLine = Math.floor(containerWidth / (fontSize * 0.6)); // Adjust the factor (0.6) as needed
      const linesPerPage = Math.floor(containerHeight / (fontSize + 30)); // Adjust the height factor (20) as needed

      const startIndex = (currentPage - 1) * (charsPerLine * linesPerPage);
      const endIndex = startIndex + (charsPerLine * (linesPerPage));

      const visibleChars = text.slice(startIndex, endIndex);
      const visibleParagraphs = visibleChars.split('\n').map((paragraph, index) => {
        
        return (
          <React.Fragment key={index}>
            {paragraph}
            <br />
          </React.Fragment>
        )
      })
      setVisibleText(visibleParagraphs);
    };

    // Update the visible text when the page dimensions or current page change
    calculateVisibleText();
  }, [text, currentPage, pageHeight, pageWidth]);

  useEffect(() => {
    // Calculate the total number of pages based on the text length
    const calculateTotalPages = () => {
      const container = containerRef.current;
      const containerHeight = container.clientHeight;
      const containerWidth = container.clientWidth;
      const fontSize = 24; // Adjust the font size as per your requirement

      const charsPerLine = Math.floor(containerWidth / (fontSize * 0.6)); // Adjust the factor (0.6) as needed
      const linesPerPage = Math.floor(containerHeight / (fontSize + 20)); // Adjust the height factor (20) as needed

      const totalChars = text.length;
      const totalLines = Math.ceil(totalChars / charsPerLine);
      setTotalPages(Math.ceil(totalLines / linesPerPage));
    };

    calculateTotalPages();
  }, [text, pageHeight, pageWidth]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div ref={containerRef} style={{ height: pageHeight, width: pageWidth, overflow: 'auto' }}>
      <h2>{visibleText}</h2>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default JournalEntry;
