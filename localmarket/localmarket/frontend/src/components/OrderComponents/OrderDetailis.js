import React from 'react'
import { 
    List,
    Typography,
    ListItem,
    ListItemText,
    Grid,
    Stack,
 } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";
import ProductDetailsButton from './ProductDetailsButton';
import LocationButton from './LocationButton';

const useStyles = makeStyles((theme) => ({
    keyListItemText: {
      width: "150px", 
      fontWeight: "bold", 
      color: theme.palette.primary.main,
    },
    valueTypography: {
      flex: 1,
      fontWeight: "bold",
      color: theme.palette.grey[700],
    },
    gridContainer: {
        margin: "20px", 
        padding: "20px",
        alignItems: "center" 
    },
    
}));

const OrderDetailis = ({order}) => {

    const classes = useStyles();
    const numberOfProducts = order.order_products.length;
    let originalPrice = 0;
    let finalPrice = 0;
    let discount_sum = 0;
  
    for (const product of order.order_products) {
        const keys = Object.keys(product.product_details.Product_variant);
        for (const key of keys ) {
            const og_value = product.product_details.Product_variant[key].og_price;
            originalPrice = originalPrice + og_value
            const ds_value = product.product_details.Product_variant[key].ds_price;
            finalPrice = finalPrice + ds_value
            const ds = product.product_details.Product_variant[key].discount;
            discount_sum = discount_sum + ds
        }
    }

    const discount = Math.round(discount_sum/numberOfProducts)

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
                <Typography variant="body2">{numberOfProducts}</Typography>
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
        <Grid container spacing={3} className={classes.gridContainer}>
            <ProductDetailsButton order={order}/>
            <LocationButton />
        </Grid>
    </Stack>
  )
}

export default OrderDetailis