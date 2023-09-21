import React from 'react'
import { 
    Container, 
    Typography, 
    Grid, 
    useMediaQuery 
} from '@mui/material'
import CustomerDetailsPaper from './CustomerDetailsPaper'
import OrderSummaryPaper from './OrderSummaryPaper'

const CartItems = [
    {
      card_id : 1,
      quantity: 1,
      product_details: {
        product_name: 'Capsicum',
        Product_variant: {
          '500 g': {
            og_price: 100,
            discount: 20,
            ds_price: 80,
          
          }
        },
        image : 'static/images/cards/capsicum.jpg' 
      }
    },
    {
      card_id : 2,
      quantity: 2,
      product_details: {
        product_name: 'Pears',
        Product_variant: {
          '125 g': {
            og_price: 58,
            discount: 20,
            ds_price: 47,
          }
        },
        image : 'static/images/cards/capsicum.jpg' 
      }
    },
    {
      card_id : 3,
      quantity: 1,
      product_details: {
        product_name: 'Horlicks',
        Product_variant: {
          '250 g': {
            og_price: 210,
            discount: 15,
            ds_price: 179,
          },
        },
        image : 'static/images/cards/capsicum.jpg' ,
      },
    },
    {
      card_id : 4,
      quantity: 1,
      product_details: {
        product_name: 'Apples',
        Product_variant: {
          '5 kg': {
            og_price: 250,
            discount: 20,
            ds_price: 200,
          },
        },
        image : 'static/images/cards/capsicum.jpg' ,
      },
    },
  
  ]

const CheckoutPage = () => {

    const isXsScreen = useMediaQuery('(max-width:600px)');

  return (
    <Container maxWidth="lg" style={{ marginTop: '30px', marginBottom: '30px'}}>
        <Typography variant="h4"  style={{ marginBottom: '20px', fontWeight: 'bold', textAlign:'center'}}>
            Checkout
        </Typography>
        <Grid
            container
            spacing={1}
            sx={{
            width: '100%',
            margin: 1,
            display: 'flex',
            flexDirection: isXsScreen ? 'column' : 'row',
            }}
        >
            <CustomerDetailsPaper />
            <OrderSummaryPaper cartitems={CartItems}/>
        </Grid>
    </Container>
  )
}

export default CheckoutPage