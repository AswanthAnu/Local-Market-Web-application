import React, {useState} from 'react'
import { 
    Button,
    Grid
} from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";
import ProductDetailTableDialog from './ProductDetailTableDialog';

const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: " #117a2d",
      color: "white",
      "&:hover": {
        backgroundColor: "#004225"
      }
    },
}));

const ProductDetailsButton = ({orderItems}) => {
    const classes = useStyles();
    const [open, setOpen ] = useState(false)
  return (
    
    <Grid item xs={6}>
        <Button 
            className={classes.button}
            onClick={() => setOpen(true)}
        >
            Products
        </Button>
        <ProductDetailTableDialog 
            open={open}
            setOpen={setOpen}
            orderItems={orderItems}
        />
    </Grid>
    
  )
}

export default ProductDetailsButton