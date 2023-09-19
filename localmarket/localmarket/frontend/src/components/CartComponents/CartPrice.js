import React, {useState} from 'react'
import { 
    Stack, 
    Typography, 
    Select,
    IconButton,
    Input 
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const CartPrice = ({cartitem}) => {

  const variants = Object.keys(cartitem.product_details.Product_variant);
  const discount_price = cartitem.product_details.Product_variant[variants].ds_price
  const orginal_price = cartitem.product_details.Product_variant[variants].og_price
  const [quantity, setQuantity] = useState(cartitem.quantity);

  const total_ds_price = discount_price * quantity
  const total_og_price = orginal_price * quantity


  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
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
        variant="h6"
        >
          ₹{total_ds_price}</Typography>
        <Typography
            variant="body2"
            style={{
            textDecoration: 'line-through',
            color: '#888', // Gray color
          }}
        >
          ₹{total_og_price}
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
    </Stack>
  )
}

export default CartPrice