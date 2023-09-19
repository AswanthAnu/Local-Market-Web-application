import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const DialogRemove = ({ openDialog, handleDialogClose, handleRemoveConfirmed }) => {
  return (
    <Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogTitle>
        <Typography variant="h6">
          Confirm Removal
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          Do you want to remove this item?
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
          No
        </Button>
        <Button
          onClick={handleRemoveConfirmed}
          color="primary"
          variant="contained" // Use contained button style
          style={{
            backgroundColor: 'green', // Green background color
            color: 'white', // White text color
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogRemove;
