import React from 'react'
import { Box,
         Paper,
         useMediaQuery,
        } from '@mui/material';
import UserDetails from '../OrderComponents/UserDetails';
import OrderDetailis from '../OrderComponents/OrderDetailis';
import DeliveryStatus from './DeliveryStatus';
        

const DeliveryAccordionDetails = ({order}) => {

    const isXsScreen = useMediaQuery('(max-width:800px')

  return (
    <Box 
        sx={{
        width: '100%', 
        margin: 1,
        display: 'flex', 
        flexDirection:  isXsScreen ? 'column' :'row' 
        }}
    >
        <Paper 
            elevation={3}
            sx={{
            flex: 1, 
            m: 1,
            padding: '32px'
            }}
        >   
            <UserDetails order={order}/>
        </Paper>
        <Paper 
            elevation={3}
            sx={{
            flex: 1, 
            m: 1,
            padding: '32px'
            }}
        >
            <OrderDetailis order={order} />
            <DeliveryStatus order={order}/>
        </Paper>
            
    </Box>
  )
}

export default DeliveryAccordionDetails