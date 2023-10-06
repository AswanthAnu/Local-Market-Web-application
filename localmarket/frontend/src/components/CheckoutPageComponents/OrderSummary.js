import React, {useState} from 'react'
import { 
    List,
    Typography,
    ListItem,
    ListItemText,
    Stack,
 } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    keyListItemText: {
      width: "150px", 
      fontWeight: "bold", 
      color: theme.palette.primary.main,
    }, 
}));

const OrderSummary = ({cartitems}) => {

    const classes = useStyles();
    let cartAmount = 0;
    let finalCartAmount = 0;
    let totalDiscount = 0;
    let cartDiscount = 0;

    

    cartitems.forEach((cartItem) => {
        const originalPrice = cartItem.product_pricing.original_price;
        const quantity = cartItem.quantity;
        const discountPrice = cartItem.product_pricing.discount_price
        const discount = cartItem.product_pricing.discount
        cartAmount += originalPrice * quantity;
        finalCartAmount += discountPrice * quantity
        totalDiscount += discount

      });
    const numberOfCartItems = cartitems.length

    cartDiscount = Math.round(totalDiscount/numberOfCartItems)

  return (
    <Stack>
        <Typography variant="h6" gutterBottom>
            Order Summary
        </Typography>
        <List disablePadding>
            <ListItem>
                <ListItemText
                    primary="Number of Products"
                    className={classes.keyListItemText}
                />
                <Typography variant="body2">{numberOfCartItems}</Typography>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Orginal Price"
                    className={classes.keyListItemText}
                />
                <Typography variant="body2"  style={{ color: "red" }}>{`₹${cartAmount.toFixed(2)}`}</Typography>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Discount"
                    className={classes.keyListItemText}
                />
                <Typography variant="body2"  style={{ color: "green" }}>{`${cartDiscount.toFixed(2)}%`}</Typography>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Final Price"
                    className={classes.keyListItemText}
                />
                <Typography variant="body2" style={{ fontWeight: "bold" }}>{`₹${finalCartAmount.toFixed(2)}`}</Typography>
            </ListItem>
        </List>
    </Stack>
  )
}

export default OrderSummary