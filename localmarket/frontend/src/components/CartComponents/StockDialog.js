import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const DialogRemove = ({ openDialog, handleDialogClose, quantity }) => {
  return (
    <Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogTitle>
        <Typography variant="h6">
          Product availability
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          The maximum quantity you can purchase is {quantity}.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDialogClose}
          color="primary"
          variant="contained" // Use contained button style
          style={{
            backgroundColor: 'green', // Green background color
            color: 'white', // White text color
          }}
        >
          Close
        </Button>
        
      </DialogActions>
    </Dialog>
  );
};

export default DialogRemove;
