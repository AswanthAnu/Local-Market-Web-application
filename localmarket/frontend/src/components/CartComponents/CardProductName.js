import React from 'react'
import { 
    Stack, 
    Typography 
} from '@mui/material'

const CardProductName = ({cartitem}) => {
  console.log(cartitem.product.product_name, '-------product')
  return (
    <Stack
      alignItems="center"
    >
        <Typography variant="body2">{cartitem.product.product_name}</Typography>
        <Typography variant="body2">Weight: {cartitem.product_variant.weight}</Typography>
    </Stack>
  )
}

export default CardProductName