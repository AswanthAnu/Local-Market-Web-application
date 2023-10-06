import React from 'react';
import {
  Card,
  Box,
  Typography,
  CardContent,
  CardActions,
  Stack,
} from '@mui/material';
import CardMedia from './CardImage';
import CardProductName from './CardProductName';
import CartPrice from './CartPrice';
import CartItemRemove from './CartItemRemove';

const Cards = ({ cartitem, index, updateCartItemQuantity, setCartItems  }) => {
  return (
    <Card key={index} sx={{ margin: '10px' }}>
      <Stack
        direction="row"
        sx={{
          '@media (max-width: 600px)': {
            flexDirection: 'column', // For xs screen size, switch to a column layout
          },
        }}
      >
        <Stack
          flex={1}
          justifyContent="space-between"
          padding={1}
          backgroundColor="#f5f5f5"
          border="1px solid #ccc"
          borderRadius="0px"
          sx={{
            '@media (max-width: 600px)': {
              flex: 0, // No flex for xs screen size
              marginBottom: '10px', // Add spacing between sections
            },
          }}
        >
          <CardMedia cartitem={cartitem} index={index} />
        </Stack>

        <Stack
          flex={1}
          justifyContent="space-between"
          padding={2}
          paddingTop={4}
          sx={{
            '@media (max-width: 600px)': {
              padding: 1, // Adjust padding for xs screen size
              paddingTop: 2, // Adjust padding for xs screen size
            },
          }}
        >
          <CardProductName cartitem={cartitem} />
        </Stack>
        <Stack
          flex={1}
          justifyContent="space-between"
          padding={2}
          sx={{
            '@media (max-width: 600px)': {
              padding: 1, // Adjust padding for xs screen size
            },
          }}
        >
          <CartPrice 
            cartitem={cartitem} 
            updateCartItemQuantity={updateCartItemQuantity} 
          />
        </Stack>
        <Stack
          flex={1}
          justifyContent="space-between"
          padding={2}
          paddingTop={4}
          sx={{
            '@media (max-width: 600px)': {
              padding: 1, // Adjust padding for xs screen size
            },
          }}
        >
          <CardActions>
            <CartItemRemove 
              cartitem = {cartitem}
              setCartItems = {setCartItems}
            />
          </CardActions>
        </Stack>
      </Stack>
    </Card>
  );
};

export default Cards;
