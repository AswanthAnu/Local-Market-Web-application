import React, {useState} from 'react'
import { 
  Button, Stack
} from '@mui/material'
import DialogRemove from './DialogRemove';

const CartItemRemove = () => {

  const [openDialog, setOpenDialog] = useState(false);

  const handleRemoveClick = () => {
    // Open the dialog when the button is clicked
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    // Close the dialog
    setOpenDialog(false);
  };

  const handleRemoveConfirmed = () => {
    // Handle the removal action here
    // You can add your logic to remove the item from the cart
    // For example, call an API to remove the item from the backend
    // Then close the dialog
    setOpenDialog(false);
  };
  
  return (
    <Stack>
      <Button
        size="small"
        color="secondary"
        style={{
          backgroundColor: '#BB2525',
          color: 'white', // White text color
        }}
        onClick={handleRemoveClick}
      >
        Remove
      </Button>
      <DialogRemove 
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        handleRemoveConfirmed={handleRemoveConfirmed}
      />
    </Stack>
  )
}

export default CartItemRemove