import React, { useState } from 'react';
import { 
    Box, 
    TextField, 
    MenuItem,  
} from '@mui/material';

const DeliveryStatus = ({order}) => {
  const [status, setStatus] = useState(order.delivery_status);

  const handleChange = (event) => {
    console.log('delivery status before', order.delivery_status, status)
    const newStatus = event.target.value;
    setStatus(newStatus);
    order.delivery_status = status
    console.log('delivery status after', order.delivery_status, status)
    
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