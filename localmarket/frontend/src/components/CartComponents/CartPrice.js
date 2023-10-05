import React, { useState, useEffect } from 'react'
import { 
    Stack, 
    Typography, 
    Select,
    IconButton,
    Input 
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import StockDialog from './StockDialog'

const CartPrice = ({cartitem, updateCartItemQuantity }) => {

  const [quantity, setQuantity] = useState(cartitem.quantity);
  const [totalOrginalPrice, setTotalOrginalPrice] = useState(cartitem.product_pricing.original_price * quantity)
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(cartitem.product_pricing.discount_price * quantity)
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {

    const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/);
    const csrfTokenValue = csrfToken ? csrfToken[1] : null;
    console.log(csrfTokenValue, 'csrf')
    const apiUrl = `/api/update-cart-item-quantity/${cartitem.id}/`;
    console.log('quantity', quantity)

    // Define the data to send in the POST request
    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfTokenValue,
      },
      body: JSON.stringify({ quantity: quantity }),
    };

    // Make the POST request to update the quantity in the database
    fetch(apiUrl, requestData)
      .then((response) => {
        if (response.ok) {
          // Quantity updated successfully
          console.log('Quantity updated in the database');
        } else {
          // Handle the error
          console.error('Failed to update quantity in the database');
        }
      })
      .catch((error) => {
        console.error('Error updating quantity:', error);
      });

    // Update totalOrginalPrice and totalDiscountPrice based on the new quantity
    setTotalOrginalPrice(cartitem.product_pricing.original_price * quantity);
    setTotalDiscountPrice(cartitem.product_pricing.discount_price * quantity);
  }, [quantity, cartitem.id]);

  const handleDialogOPen = () => {
    // Open the dialog when the button is clicked
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    // Close the dialog
    setOpenDialog(false);
  };



  const handleQuantityChange = (event) => {
    
    const newQuantity = parseInt(event.target.value);
    if (newQuantity <= cartitem.product_variant.stock_quantity){ 
      updateCartItemQuantity(cartitem.id, newQuantity);
      setQuantity(newQuantity);
      setTotalOrginalPrice(cartitem.product_pricing.original_price * newQuantity)
      setTotalDiscountPrice(cartitem.product_pricing.discount_price * newQuantity)
    }
    else{
      handleDialogOPen()
    }
  };

  const handleIncrement = () => {

    if (quantity + 1 <= cartitem.product_variant.stock_quantity){ 
      updateCartItemQuantity(cartitem.id, quantity + 1);
      setQuantity(quantity + 1);
      setTotalOrginalPrice(cartitem.product_pricing.original_price * quantity)
      setTotalDiscountPrice(cartitem.product_pricing.discount_price * quantity)
    }
    else{
      handleDialogOPen()
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateCartItemQuantity(cartitem.id, quantity - 1);
      setQuantity(quantity - 1);
      setTotalOrginalPrice(cartitem.product_pricing.original_price * quantity)
      setTotalDiscountPrice(cartitem.product_pricing.discount_price * quantity)
    }
  };

  

  return (
    <Stack
      justifyContent="center"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginLeft={4}
        marginRight={3}
        marginBottom={1}
      >
        <Typography 
        variant="body2"
        >
          ₹{totalDiscountPrice.toFixed(2)}</Typography>
        <Typography
            variant="body2"
            style={{
            textDecoration: 'line-through',
            color: '#888', // Gray color
          }}
        >
          ₹{totalOrginalPrice.toFixed(2)}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        marginBottom={1}
        justifyContent="space-between"
        border="3px solid #ccc" // Add a border
        borderRadius="2px" // Rounded corners
        
      >
        <IconButton onClick={handleDecrement}>
          <RemoveIcon />
        </IconButton>
        <Input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          inputProps={{
            min: '1',
            inputMode: 'text',
            style: {
              border: 'px solid #ccc', // Remove border from Input
              width: '100px',
              textAlign: 'end',
            },
          }}
          style={{ width: '30px' }}
        />
        <IconButton onClick={handleIncrement}>
          <AddIcon />
        </IconButton>
      </Stack>
      <StockDialog 
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        quantity={cartitem.product_variant.stock_quantity}
      />
    </Stack>
  )
}

export default CartPrice