import React from 'react'
import { 
    Stack, 
    Typography 
} from '@mui/material'

const CardProductName = ({cartitem}) => {

  const variants = Object.keys(cartitem.product_details.Product_variant);
  return (
    <Stack
      alignItems="center"
    >
        <Typography variant="h6">{cartitem.product_details.product_name}</Typography>
        <Typography variant="body2">Weight: {variants}</Typography>
    </Stack>
  )
}

export default CardProductName