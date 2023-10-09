import React from 'react'
import { Stack,
         Typography,
         useMediaQuery 
        } from '@mui/material' 

const OrderAccordianSummary = ( {order}) => {
  
  const isXsScreen = useMediaQuery('(max-width:1000px')

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

export default OrderAccordianSummary