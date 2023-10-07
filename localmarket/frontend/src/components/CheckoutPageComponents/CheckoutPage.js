import React, {useState, useEffect} from 'react'
import { 
    Container, 
    Typography, 
    Grid, 
    useMediaQuery 
} from '@mui/material'
import CustomerDetailsPaper from './CustomerDetailsPaper'
import OrderSummaryPaper from './OrderSummaryPaper'



const CheckoutPage = () => {

    const isXsScreen = useMediaQuery('(max-width:600px)');
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const apiUrl = '/api/ordersummary-cart/'
      const token = localStorage.getItem('token')
      console.log("entered into checkout")
      fetch(apiUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      }).then((response) => response.json()).then((data) => {
        console.log(data, 'data')
        setCartItems(data)
        
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
      })
    }, [])

  return (
    !loading && (
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
              <CustomerDetailsPaper cartitems={cartItems}/>
              <OrderSummaryPaper cartitems={cartItems}/>
          </Grid>
      </Container>
    )
  )
}

export default CheckoutPage