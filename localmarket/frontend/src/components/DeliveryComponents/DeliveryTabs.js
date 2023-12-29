import {
    Box,
    Tab,
  } from '@mui/material';
  import {
    TabContext,
    TabList,
    TabPanel,
  } from '@mui/lab';
  import React, { useState } from 'react';
  import DeliveryAccordian from './DeliveryAccordian';
  
  const DeliveryTabs = ({ orders, setOrders }) => {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    let pendingOrders = [];
    let deliveredOrders = [];
  
    if (Array.isArray(orders)) {
      pendingOrders = orders.filter((order) => order.order_details[0].delivery_status === 'pending');
      deliveredOrders = orders.filter((order) => order.order_details[0].delivery_status === 'delivered');
    }
  
    return (
      <Box>
        <TabContext value={value}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <TabList
              aria-label="Delivery Tabs"
              onChange={handleChange}
            >
              <Tab label="Pending" value="1" />
              <Tab label="Delivered" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <DeliveryAccordian orders={pendingOrders} setOrders={setOrders} />
          </TabPanel>
          <TabPanel value="2">
            <DeliveryAccordian orders={deliveredOrders} setOrders={setOrders} />
          </TabPanel>
        </TabContext>
      </Box>
    );
  };
  
  export default DeliveryTabs;
  