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
import Invoice from './Invoice';

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
        <Grid container direction="row" spacing={2} className={classes.gridContainer}>
            <Grid item>
                <ProductDetailsButton orderItems={order.order_details} />
            </Grid>
            <Grid item>
                <LocationButton orderCustomer={order.customer} />
            </Grid>
            <Grid item>
                <Invoice order_id={order.id} />
            </Grid>
        </Grid>
    </Stack>
  )
}

export default OrderDetailis