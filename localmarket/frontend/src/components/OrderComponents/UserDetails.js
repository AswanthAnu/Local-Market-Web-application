import React from 'react'
import { 
    Stack,
    Typography,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    keyTypography: {
      width: "150px",  
      color: theme.palette.grey[700],
    },
    valueTypography: {
      flex: 1,
    },
}));

const UserDetails = ({order}) => {

    const classes = useStyles();

  return (
    <List disablePadding>
      <Typography variant="h6" gutterBottom>
        Customer Details
      </Typography>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <Typography className={classes.keyTypography}>Name:</Typography>
              <Typography className={classes.valueTypography}>
                {`${order.customer.first_name} ${order.customer.last_name}`}
              </Typography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <Typography className={classes.keyTypography}>
                Address line 1:
              </Typography>
              <Typography className={classes.valueTypography}>
                {order.customer.address_line1}
              </Typography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <Typography className={classes.keyTypography}>
                Address line 2:
              </Typography>
              <Typography className={classes.valueTypography}>
                {order.customer.address_line2}
              </Typography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <Typography className={classes.keyTypography}>
                Phone number:
              </Typography>
              <Typography className={classes.valueTypography}>
                {order.customer.phone_number}
              </Typography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <Typography className={classes.keyTypography}>Street:</Typography>
              <Typography className={classes.valueTypography}>
                {order.customer.street_address}
              </Typography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <Typography className={classes.keyTypography}>City:</Typography>
              <Typography className={classes.valueTypography}>
                {order.customer.city}
              </Typography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Stack direction="row">
              <Typography className={classes.keyTypography}>Zipcode:</Typography>
              <Typography className={classes.valueTypography}>
                {order.customer.pincode}
              </Typography>
            </Stack>
          }
        />
      </ListItem>
    </List>
  )
}

export default UserDetails