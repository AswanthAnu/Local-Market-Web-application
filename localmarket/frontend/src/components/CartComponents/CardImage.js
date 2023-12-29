import React from 'react'
import { 
    Stack, 
    CardMedia 
} from '@mui/material'

const CardImage = ({cartitem, index}) => {
  console.log(cartitem.product.image, 'cartitem.product---------')
  return (
    <CardMedia
        component="img"
        alt={`Image for item ${index}`}
        
        style={{ objectFit: 'cover' }}
        image={cartitem.product.image}
    />
  )
}

export default CardImage