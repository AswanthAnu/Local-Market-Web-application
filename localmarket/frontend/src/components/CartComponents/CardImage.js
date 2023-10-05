import React from 'react'
import { 
    Stack, 
    CardMedia 
} from '@mui/material'

const CardImage = ({cartitem, index}) => {
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