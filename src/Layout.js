import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useModal } from './ModalContext';
import ChatModal from './ChatModal';
import { useStudent } from './StudentContext';

const Layout = ({ children }) => {
  const { student } = useStudent();
  const { isOpen, toggleModal } = useModal(); 
  const buttonStyle = {
    position: 'fixed',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
    color: 'white',
    borderRadius: '50px',
    padding: '10px 24px',
    textTransform: 'none',
    fontSize: '0.875rem',
    minWidth: 'auto',
    width: 'auto'
  };

  return (
    <>
      {children}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={toggleModal}
        style={buttonStyle}
      >
        Ask Recruit AI
      </Button>
      <ChatModal open={isOpen} handleClose={toggleModal} student={student}/>
    </>
  );
};

export default Layout;
