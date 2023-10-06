import React from 'react'
import { 
    Button,
    Grid
} from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#117a2d",
    color: "white",
    padding:"10px",
    "&:hover": {
        backgroundColor: "#004225"
      }
  },
}));


const CheckoutButton = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const handleCheckoutClick = () => {
      navigate('/checkout');
    };
  return (
    <Grid item xs={6}>
        <Button 
          className={classes.button}
          onClick={handleCheckoutClick}
        >
            Checkout
            <ShoppingCartIcon sx={{padding:'7px'}}/>
        </Button>
    </Grid>
  )
}

export default CheckoutButton