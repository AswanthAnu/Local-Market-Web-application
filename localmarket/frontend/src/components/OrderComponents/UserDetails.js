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
                {order.customer_name}
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
                {order.customer_address.add_line_1}
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
                {order.customer_address.add_line_2}
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
                {order.customer_phone}
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
                {order.customer_address.street_address}
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
                {order.customer_address.city}
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
                {order.customer_address.zip_code}
              </Typography>
            </Stack>
          }
        />
      </ListItem>
    </List>
  )
}

export default UserDetails