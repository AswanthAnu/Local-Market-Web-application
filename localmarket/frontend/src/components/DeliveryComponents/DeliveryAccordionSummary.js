import React from 'react'
import { 
    Stack,
    Typography,
    useMediaQuery 
} from '@mui/material' 

const DeliveryAccordionSummary = ( {order}) => {
  
  const isXsScreen = useMediaQuery('(max-width:600px')

  return (
    <Stack
      direction={isXsScreen ? 'column' : 'row'}
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Typography sx={{ fontWeight: 'bold' }} variant='h5'>
      {`${order.customer.first_name} ${order.customer.last_name}`}
      </Typography>
      <Typography variant='body2'>
        Delivery location: {order.customer.street_address}
      </Typography>
    </Stack>
  )
}

export default DeliveryAccordionSummary