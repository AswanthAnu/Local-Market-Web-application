import React, {useState} from 'react'
import { 
  Button, Stack
} from '@mui/material'
import DialogRemove from './DialogRemove';

const CartItemRemove = ({cartitem, setCartItems}) => {

  const [openDialog, setOpenDialog] = useState(false);

  const handleRemoveClick = () => {
    // Open the dialog when the button is clicked
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    // Close the dialog
    setOpenDialog(false);
  };

  // CartItemRemove.js
  const fetchUpdatedCart = () => {
    const apiUrl = '/api/cart/';
    const token = localStorage.getItem('token');
  
    fetch(apiUrl, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update your cart state with the new data
        console.log(data)
        setCartItems(data.cart_items);
      })
      .catch((error) => {
        console.error('Error fetching updated cart data:', error);
      });
  };

  
  const handleRemoveConfirmed = () => {
    // Make an API request to remove the cart item
    const apiUrl = `/api/remove-cart-item/${cartitem.id}/`;

    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`, // Add your authentication headers
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchUpdatedCart()
          console.log('Cart item removed successfully');
        } else {
          // Handle error (e.g., show an error message)
          console.error('Failed to remove cart item');
        }
      })
      .catch((error) => {
        console.error('Error removing cart item:', error);
      });

    // Close the dialog
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