import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  FormControl, 
  Stack, 
  FormControlLabel, 
  Checkbox,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions, 
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { geolocated } from 'react-geolocated';

const CustomerForm = ({ cartitems }) => {
  const [formData, setFormData] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    streetAddress: '',
    city: '',
    zipcode: '',
    phoneNumber: '',
    locationEnabled: false,
    latitude: null,
    longitude: null,
  });
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  // const { isGeolocationEnabled, coords } = props;
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (formData.phoneNumber.length === 10) {
      // Make an API call to check if the phone number exists
      checkPhoneNumberExists(formData.phoneNumber);
    }
  }, [formData.phoneNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    // Optionally, you can navigate to the order page here
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  }

  const handleOrder = () => {
    // Calculate the total amount, total discount, and discount amount based on cart items
    let totalAmount = 0;
    let totalDiscount = 0;
    let totalDiscountAmount = 0;

    console.log("cartItems in order", cartitems)

    const orderDetails = cartitems.map(cartItem => {
      // Calculate item total price and discounts
      const originalPrice = cartItem.product_pricing.original_price;
      const discount = cartItem.product_pricing.discount;
      const discountPrice = cartItem.product_pricing.discount_price;
      const quantity = cartItem.quantity;

      // Calculate item total price
      const totalItemPrice = originalPrice * quantity;

      // Calculate item total price after discount
      const totalItemDiscount = discountPrice * quantity;

      totalAmount += totalItemPrice;
      totalDiscountAmount += totalItemDiscount;
      totalDiscount += discount;

      return {
        product: cartItem.product_id,
        variant: cartItem.variant_id,
        quantity: quantity,
        total_price: totalItemPrice.toFixed(2),
        discount: discount,
        discount_price: discountPrice.toFixed(2),
      };
    });

    // Calculate average discount
    const totalAvgDiscount = totalDiscount / cartitems.length;

    // Construct the customer and order details objects
    const customerData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      address_line1: formData.addressLine1,
      address_line2: formData.addressLine2,
      street_name: formData.streetAddress,
      city: formData.city,
      pincode: formData.zipcode,
      phone_number: formData.phoneNumber,
      locationEnabled: true,
      latitude: formData.latitude,
      longitude: formData.longitude
      
    };

    const orderData = {
      total_amount: totalAmount.toFixed(2),
      total_discount: totalAvgDiscount.toFixed(2),
      discount_amount: totalDiscountAmount.toFixed(2),
      cart_id: cartitems[0].cart_id,
      order_details: orderDetails,
    };
    console.log(cartitems[0].cart_id, 'cart id----')

    // Send the data to the API
    const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/);
    const csrfTokenValue = csrfToken ? csrfToken[1] : null;
    const Token = localStorage.getItem('token');
    fetch('/api/create-order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfTokenValue,
        'Authorization': `Token ${Token}`,
      },
      body: JSON.stringify({ customer: customerData, order_details: orderData }),
    })
      .then(response => {
        if (response.ok) {
          // Order created successfully, open the success dialog
          setSuccessDialogOpen(true);
          setTimeout(() => {
             // Close the dialog
            navigate('/orders');
          }, 4500);
          
        } else {
          // Handle errors
          response.json().then(data => {
            if (data.message) {
              setErrorMessage(data.message); // Set the error message from the response
            } else {
              setErrorMessage('Something went wrong. Please try again later.');
            }
          });
          setErrorDialogOpen(true); // Open the error dialog
        }
      })
      .catch(error => {
        // Handle network or other errors
        console.error(error);
        setErrorMessage('Something went wrong. Please try again later.');
        setErrorDialogOpen(true);
      });
  };

  const checkPhoneNumberExists = (phoneNumber) => {
    console.log('enterd into phonenumber check')
    // Make an API call to check if the phone number exists
    fetch(`/api/check-phone-number-exists/?phone_number=${phoneNumber}`)
      .then(response => response.json())
      .then(data => {
        console.log("customer data", data)
        if (data.exists) {
          // Phone number exists, update the form with customer data
          const customerData = data.customer;
          const customerAddressData = data.customerAddress;

          setFormData({
            ...formData,
            first_name: customerData.first_name,
            last_name: customerData.last_name,
            addressLine1: customerAddressData.address_line1,
            addressLine2: customerAddressData.address_line2,
            streetAddress: customerAddressData.street_name,
            city: customerAddressData.city,
            zipcode: customerAddressData.pincode,
          });
        }
      })
      .catch(error => {
        console.error('Error checking phone number:', error);
      });
  };

  const openLocationDialog = () => {
    setLocationDialogOpen(true);
  };
  
  // Function to close the location dialog
  const closeLocationDialog = () => {
    setLocationDialogOpen(false);
  };

  const handleLocationEnable = () => {
    console.log('entered handleLocationEnable')
    if (!formData.locationEnabled) {
      
      // Open the location dialog when the checkbox is checked
      openLocationDialog();
    } else {
      // If the checkbox is unchecked, location is disabled
      setFormData({
        ...formData,
        locationEnabled: false,
        latitude: null,
        longitude: null
      });
    }
  };

  const captureLocation = () => {
    setLoading(true)
    console.log('entered into captureLocation')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude, 'lat-long')
        setFormData({
          ...formData,
          locationEnabled: true,
          latitude,
          longitude,
        });
        closeLocationDialog(); // Close the dialog after capturing location
        setLoading(false)
      },
      (error) => {
        console.error('Error capturing location:', error);
        closeLocationDialog(); // Close the dialog in case of an error
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 100000, maximumAge: 2000 }
    );
    } else {
      console.error('Geolocation is not available in this browser.');
      setLoading(false); // Set loading back to false if geolocation is not available
    }
  };

  return (
    <form>
  
          <Stack direction="row">
            <FormControl fullWidth margin="normal">
              <TextField
                id="first_name"
                name="first_name"
                label="First Name"
                value={formData.first_name}
                onChange={handleChange}
                fullWidth
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal" style={{ marginLeft: '10px' }}>
              <TextField
                id="last_name"
                name="last_name"
                label="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                fullWidth
                required
              />
            </FormControl>
          </Stack>
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
            <FormControl fullWidth margin="normal" style={{ marginLeft: '10px' }}>
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
            <FormControl fullWidth margin="normal" style={{ marginLeft: '10px' }}>
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
            onClick={handleOrder}
            fullWidth
            margin="normal"
          >
            Order
          </Button>
      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
        <DialogTitle style={{ color: 'green', textAlign: 'center' }}>
          Order Placed Successfully
        </DialogTitle>
        <DialogContent>
          <Typography style={{ textAlign: 'center' }}>
            You will be redirected to the order page shortly.
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onClose={handleCloseErrorDialog}>
        <DialogTitle style={{ color: 'red', textAlign: 'center' }} >
          Something went wrong...!
        </DialogTitle>
        <DialogContent>
          <Typography >
            {errorMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={locationDialogOpen} onClose={closeLocationDialog}>
        <DialogTitle>Enable Location</DialogTitle>
        <DialogContent>
          <Typography>
            This feature requires access to your location. Do you want to enable location tracking?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLocationDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              captureLocation()
            }}
            color="primary"
          >
            Enable
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default CustomerForm;
