import React from 'react'
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
    let numberOfCartItems = 0;
    let originalPrice = 0;
    let finalPrice = 0;
    let discount_sum = 0;
  
    for (const cartitem of cartitems) {
        numberOfCartItems = numberOfCartItems + cartitem.quantity
        const key = Object.keys(cartitem.product_details.Product_variant);
        const og_value = cartitem.product_details.Product_variant[key].og_price;
        originalPrice = originalPrice + (og_value *  cartitem.quantity)
        const ds_value = cartitem.product_details.Product_variant[key].ds_price;
        finalPrice = finalPrice + (ds_value * cartitem.quantity)
        const ds = cartitem.product_details.Product_variant[key].discount;
        discount_sum = discount_sum + ds
        
    }

    const discount = Math.round(discount_sum/numberOfCartItems)

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
                <Typography variant="body2"  style={{ color: "red" }}>{`₹${originalPrice}`}</Typography>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Discount"
                    className={classes.keyListItemText}
                />
                <Typography variant="body2"  style={{ color: "green" }}>{`${discount}%`}</Typography>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Final Price"
                    className={classes.keyListItemText}
                />
                <Typography variant="body2" style={{ fontWeight: "bold" }}>{`₹${finalPrice}`}</Typography>
            </ListItem>
        </List>
    </Stack>
  )
}

export default OrderSummary