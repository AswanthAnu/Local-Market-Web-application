import React, { useState } from 'react';
import { 
  Button, 
  Grid, 
  Dialog, 
  DialogActions, 
  DialogTitle, 
  DialogContent,
  Typography 
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#117a2d",
    color: "white",
    "&:hover": {
      backgroundColor: "#004225"
    },
  },
}));

const LocationButton = ({ orderCustomer }) => {
  const classes = useStyles();
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const phoneNumber = orderCustomer.phone_number
  

  const openGoogleMaps = () => {
    
    fetch(`/api/get-customer-coordinates/?phone_number=${phoneNumber}`)
      .then(response => response.json())
      .then(data => {
        if (data.latitude && data.longitude) {
          const latitude = data.latitude;
          const longitude = data.longitude;
          const myLocation = "my_location"; // Replace with your actual location or latitude/longitude

          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${myLocation}&destination=${latitude},${longitude}`;
          window.open(googleMapsUrl, '_blank');
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
        console.error('Error fetching coordinates:', error);
      });
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  }

  return (
    <Grid item xs={6}>
      <Button className={classes.button} onClick={openGoogleMaps}>
        Location
      </Button>
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
    </Grid>
  );
};

export default LocationButton;
