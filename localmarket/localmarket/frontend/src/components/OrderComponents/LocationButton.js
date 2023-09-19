import React from 'react'
import { 
    Button,
    Grid
} from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: " #117a2d",
    color: "white",
    "&:hover": {
        backgroundColor: "#004225"
      }
  },
}));

const LocationButton = () => {
    const classes = useStyles();
  return (
    <Grid item xs={6}>
        <Button className={classes.button}>Location</Button>
    </Grid>
  )
}

export default LocationButton