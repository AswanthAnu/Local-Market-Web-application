import React, { useState, useEffect, useCallback }from 'react'
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  useMediaQuery,
  Pagination
} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import CartItemsCard from './CartItemsCard'
import OrderSummaryCard from './OrderSummaryCard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import OfferBanner from '../HomePageComponents/OfferBanner';
import OfferCartItemsCard from './OfferCartItemsCard';

const Cart = () => {

  const isXsScreen = useMediaQuery('(max-width:1100px')
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [offerProduct, setOfferProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `/api/cart/?page=${currentPage}`
    const token = localStorage.getItem('token')
    fetch(apiUrl, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.json()).then((data) => {
      console.log(data.cart_items)
      setCartItems(data.cart_items)
      setTotalPages(Math.ceil(data.total_cart_items/12));
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data: ', error)
    })
  }, [currentPage])

  const updateCartItemQuantity = useCallback((cartItemId, newQuantity) => {
    // Find the cart item in cartItems and update its quantity
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === cartItemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
  
    setCartItems(updatedCartItems);
  }, [cartItems, setCartItems]);

  const handleBackHome = () => {
    navigate('/');
  }

  const handlePageChange = (event, newPage) => {
    console.log("newPage:", newPage);
    console.log("totalPages:", totalPages);
    setLoading(true)
    if (newPage >= 1 && newPage <= totalPages) {
      console.log('entered into if')
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const apiUrl = '/api/offercheck/';
    const token = localStorage.getItem('token');
    setLoading(true);
  
    const fetchOfferData = async () => {
      
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cartItems }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const offerData = await response.json();
        setOfferProduct(offerData.free_items)
      } catch (error) {
        console.error('Error fetching offer data: ', error);
      }
    };
    
    fetchOfferData();
    setLoading(false);
  }, [cartItems, updateCartItemQuantity]);
  
  

  return (
    !loading && (
      <Container maxWidth="lg" style={{ marginTop: '30px', marginBottom: '30px'}}>
        <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>
          My Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '60vh',
            }}
          >
            <ShoppingCartIcon
              sx={{ fontSize: '64px', color: 'gray' }}
            />
            <Typography variant="h6" color="textSecondary">
              Your cart is empty. Go back to the home and grab something.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
              onClick={handleBackHome}
            >
              Back to Home
            </Button>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {/* First Row */}
            <Grid item xs={8} justifyContent={"center"}>
              <OfferBanner />
            </Grid>
            {/* Second Row */}
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
              <CartItemsCard 
                cartitems={cartItems} 
                updateCartItemQuantity={updateCartItemQuantity} 
                setCartItems={setCartItems}
              />
             {/* {offerProduct.length > 0 && (
                <OfferCartItemsCard freeitems={offerProduct} />
              )} */}


              <OrderSummaryCard cartitems={cartItems}/>
            </Grid>
            {/* Pagination Section */}
            {totalPages > 1 ? (
              <Grid container justifyContent="center">
                <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="primary"
                  />
                </Box>
              </Grid>
            ) : (
              <Grid>
                {/* Placeholder for content when totalPages <= 1 */}
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    )
    );
  }  

export default Cart