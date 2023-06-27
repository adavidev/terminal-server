import React, { useEffect, useRef } from 'react';
import { ContentWrapper, DialogWrapper } from './ThemedStyles'
import { useSelector } from 'react-redux'

export default ({ close, children }) => {
  const dialogRef = useRef(null);
  const [theme] = useSelector((state) => [state.theme])

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape' || event.key === 'Enter') {
        closeDialog();
      }
    };

    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        closeDialog();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeDialog = () => {
    // Perform any additional logic before closing the dialog
    close()
    console.log('Dialog closed');
  };

  return (
    <DialogWrapper>
      <ContentWrapper {...theme} ref={dialogRef}>{children}</ContentWrapper>
    </DialogWrapper>
  );
}
