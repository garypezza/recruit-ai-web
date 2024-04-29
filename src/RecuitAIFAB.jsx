import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Replace 'Add' with your icon of choice

const fabStyle = {
  position: 'fixed',
  bottom: 20,
  right: 20,
};

const YourComponent = () => {
  return (
    <div>
      {/* Your existing JSX code */}
      <Fab color="primary" aria-label="Ask Recruit AI" style={fabStyle}>
        <AddIcon /> {/* Replace AddIcon with the icon you want */}
      </Fab>
    </div>
  );
};

export default YourComponent;
