import { 
    Box, 
    Tab
} from '@mui/material'
import { 
    TabContext, 
    TabList, 
    TabPanel 
} from '@mui/lab'
import React, { useState } from 'react'
import DeliveryAccordian from './DeliveryAccordian'

const DeliveryTabs = ({orders}) => {
    
    const [value, setValue] = useState('1')
    const handeChange = (event, newValue) => {
        setValue(newValue)
    }

    const pendingOrders = orders.filter((order) => order.delivery_status === 'pending')
    const deliveredOrders = orders.filter((order) => order.delivery_status === 'delivered')
    console.log('pendingOrders:', pendingOrders)


  return (
    <Box>
        <TabContext value={value}>
            <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                borderBottom: 1, 
                borderColor: 'divider' 
                }}>
                <TabList 
                aria-label='Delivery Tabs'
                onChange={handeChange}
                >
                    <Tab label='Pending' value='1' />
                    <Tab label='Delivered' value='2' />
                </TabList>
            </Box>
            <TabPanel value='1'>
                <DeliveryAccordian orders={pendingOrders}/>
            </TabPanel>
            <TabPanel value='2'>
                <DeliveryAccordian orders={deliveredOrders}/>
            </TabPanel>
        </TabContext>
    </Box>
  )
}

export default DeliveryTabs