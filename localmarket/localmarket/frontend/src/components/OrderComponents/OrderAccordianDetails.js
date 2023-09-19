import React from 'react'
import { Box,
         Paper,
         Stack,
         Typography,
         useMediaQuery,
        } from '@mui/material';
import UserDetails from './UserDetails';
import OrderDetailis from './OrderDetailis';
        

const OrderAccordianDetails = ({order}) => {

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
            <Typography>
                <OrderDetailis order={order} />
            </Typography>
        </Paper>
    </Box>
  )
}

export default OrderAccordianDetails