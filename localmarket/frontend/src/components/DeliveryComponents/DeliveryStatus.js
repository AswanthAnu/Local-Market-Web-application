import React, { useState } from 'react';
import { 
    Box, 
    TextField, 
    MenuItem,  
} from '@mui/material';

const DeliveryStatus = ({order, setOrders}) => {
  const [status, setStatus] = useState(order.order_details[0].delivery_status);

  const fetchUpdatedOrders = async () => {
    const apiUrl = '/api/delivery/';
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        console.error('Failed to fetch updated orders');
        return [];
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };
  

  const updateDeliveryStatus = async (orderId, newStatus) => {
    try {
      const apiUrl = `/api/update-delivery-status/${orderId}/`;
      const token = localStorage.getItem('token');
  
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ delivery_status: newStatus }),
      });
  
      if (response.status === 200) {
        console.log('Delivery status updated successfully');
        // After successfully updating the status, fetch the updated orders
        const updatedOrders = await fetchUpdatedOrders();
        setOrders(updatedOrders);
      } else {
        console.error('Failed to update delivery status');
      }
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };
  

  const handleChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    await updateDeliveryStatus(order.id, newStatus);
  };
  

  return (
    <Box>
        <TextField
            label='Delivery Status'
            select
            value={status}
            onChange={handleChange}
            fullWidth
        >
            <MenuItem value='pending'>Pending</MenuItem>
            <MenuItem value='delivered'>Delivered</MenuItem>
        </TextField>
    </Box>
  );
}

export default DeliveryStatus