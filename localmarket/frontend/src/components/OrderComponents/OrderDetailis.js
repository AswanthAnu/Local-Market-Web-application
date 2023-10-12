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

    const numberOfOrderItems = order.order_details.length
    console.log(order.order_details, '[0]')

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
                <Typography variant="body2">{numberOfOrderItems}</Typography>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Orginal Price"
                    className={classes.keyListItemText}
                />
                <Typography variant="body2"  style={{ color: "red" }}>{`₹${order.total_amount}`}</Typography>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Discount"
                    className={classes.keyListItemText}
                />
                <Typography variant="body2"  style={{ color: "green" }}>{`${order.total_discount}%`}</Typography>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Final Price"
                    className={classes.keyListItemText}
                />
                <Typography variant="body2" style={{ fontWeight: "bold" }}>{`₹${order.discount_amount}`}</Typography>
            </ListItem>
        </List>
        <Grid container spacing={3} className={classes.gridContainer}>
            <ProductDetailsButton orderItems={order.order_details}/>
            <LocationButton orderCustomer={order.customer}/>
        </Grid>
    </Stack>
  )
}

export default OrderDetailis