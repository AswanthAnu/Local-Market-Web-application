import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  FormControl, 
  Stack, 
  FormControlLabel, 
  Checkbox 
} from '@mui/material';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    streetAddress: '',
    city: '',
    zipcode: '',
    phoneNumber: '',
    locationEnabled: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLocationEnable = () => {
    {formData.locationEnabled  ? 
        setFormData({
            ...formData,
            locationEnabled: false
        ,}) :
        setFormData({
        ...formData,
        locationEnabled: true,
        })
    }
  };

  return (
    <form>
      <FormControl fullWidth margin="normal">
        <TextField
          id="name"
          name="name"
          label="Name"
          defaultValue="Default Value"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          id="addressLine1"
          name="addressLine1"
          label="Address Line 1"
          value={formData.addressLine1}
          onChange={handleChange}
          fullWidth
          required
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          id="addressLine2"
          name="addressLine2"
          label="Address Line 2"
          value={formData.addressLine2}
          onChange={handleChange}
          fullWidth
          required
        />
      </FormControl>
      <Stack direction="row">
        <FormControl fullWidth margin="normal">
            <TextField
            id="streetAddress"
            name="streetAddress"
            label="Street Address"
            value={formData.streetAddress}
            onChange={handleChange}
            fullWidth
            required
            />
        </FormControl>
        <FormControl fullWidth margin="normal" style={{marginLeft:'10px'}}>
            <TextField
            id="city"
            name="city"
            label="City"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            required
            />
        </FormControl>
      </Stack>
      <Stack direction="row">
        <FormControl fullWidth margin="normal">
            <TextField
            id="zipcode"
            name="zipcode"
            label="Zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            fullWidth
            required
            />
        </FormControl>
        <FormControl fullWidth margin="normal" style={{marginLeft:'10px'}}>
            <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
            />
        </FormControl>
      </Stack>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.locationEnabled}
            onChange={handleLocationEnable}
            name="locationEnabled"
            color="primary"
          />
        }
        label="Enable Location"
      />
      <Button
        variant="contained"
        color="success"
        onClick={handleLocationEnable}
        fullWidth
        margin="normal"
      >
        Order
      </Button>
    </form>
  );
};

export default CustomerForm;
