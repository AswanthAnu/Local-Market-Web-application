import React, { useState, useEffect } from 'react'
import {Container, 
        Grid, 
        Card, 
        CardContent, 
        CardActions, 
        CardMedia, 
        Typography, 
        Button, 
        Box, 
        MenuItem, 
        Select,
        Stack,
        Snackbar,
        Alert,
        Pagination
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchField from '../SearchFieldComponents/SearchField';
import CategoryChip from './CategoryChip';




const HomePageContent = () => {

  const [products, setProducts] = useState([])
  const [selectedVariants, setSelectedVariants] = useState([])
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const apiUrl = `/api/products/?page=${currentPage}`
    
    fetch(apiUrl).then((response) => response.json()).then((data) => {
      console.log(data, "data")
      setProducts(data.products)
      setTotalPages(Math.ceil(data.total_products/12));
      const initialVariants = data.products.map((product) => product.variants[0]?.id || '');
        setSelectedVariants(initialVariants);
        console.log('initial variant', initialVariants)

      const allCategories = data.products.flatMap((product) =>
        product.category
        );
        console.log("categories",allCategories)
        const uniqueCategories = [...new Set(allCategories)];
        setUniqueCategories(uniqueCategories);
        
        setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data: ', error)
    })
  }, [currentPage])




  const handleSearch = (searchResults) => {
    
    console.log(searchResults, 'searchresult')
    setLoading(true)
    const initialSearchVariants = searchResults.map((product) => product.variants[0]?.id || '');
    console.log("intialsearchvariant", initialSearchVariants)
    setSelectedVariants(prev => [...initialSearchVariants]);
    setProducts(prev => [...searchResults]);
    setLoading(false);
   
    
  };

  const handleVariantChange = (event, productIndex) => {
    const variantKey = event.target.value;
    const updatedVariants = [...selectedVariants];
    updatedVariants[productIndex] = variantKey;
    setSelectedVariants(updatedVariants);
  };

  const handlePageChange = (event, newPage) => {
    console.log("newPage:", newPage);
    console.log("totalPages:", totalPages);
    setLoading(true)
    if (newPage >= 1 && newPage <= totalPages) {
      console.log('entered into if')
      setCurrentPage(newPage);
    }
  };


  
    console.log('product',products),
    console.log("selectvariants", selectedVariants)
    console.log('---------------------------------------------------------------------')
  // add to cart ----------------------------------------------------- 
  const addToCart = async (variantId) => {
    console.log(variantId, 'variant id')
    try {
      
      const csrfToken = document.cookie.match(/csrftoken=([\w-]+)/);
      const csrfTokenValue = csrfToken ? csrfToken[1] : null;
      console.log(csrfToken, 'csrf')
      const response = await fetch(`/api/add-to-cart/${variantId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfTokenValue,
        },
        body: JSON.stringify({ quantity: 1 }),
      });

      console.log(response, 'response')

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSnackbarMessage('Item added to cart successfully');
      setSnackbarOpen(true); 
      console.log('Item added to cart:', data);
    } catch (error) {
      console.error('Error adding item to cart: ', error);
    }
  };


  return (
    !loading && (
      <Container maxWidth="lg" style={{ marginTop: '30px', marginBottom: '30px'}}>
        <Stack>
          <CategoryChip 
            items={uniqueCategories}
            onSearch={handleSearch}
          />
          <SearchField onSearch={handleSearch}/>
        </Stack>
        <div>
          {products.length === 0 ? ( 
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
                Sorry, there is no items matching this...!
              </Typography>
              
            </Box>
          ) : (
            <Grid container spacing={2}>
              {products.map((product, index) => (
                <Grid item 
                      xs={6} 
                      sm={4} 
                      md={3} 
                      lg={3} 
                      key={index}>
                  <Card style={{ height: '100%',}}>
                      <Box sx={{ 
                                  m: 1, 
                                  border: 1, 
                                  borderColor: 'grey.200', 
                                  borderRadius: '16px', 
                                  position: 'relative' }}>
                          {console.log(selectedVariants) }
                        {selectedVariants[index] &&
                        product.variants.find((variant) => variant.id === selectedVariants[index]).pricing.discount > 0 && (           
                          <Typography
                            variant="body2"
                            component="div"
                            style={{
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              background: 'rgba(0, 128, 0, 0.7)',
                              color: 'white',
                              padding: '4px 8px',
                              borderTopLeftRadius: '16px',
                            }}
                          >
                            {selectedVariants[index] &&
                            product.variants.find((variant) => variant.id === selectedVariants[index]).pricing.discount}% off
                          </Typography>
                        )}
                        <CardMedia
                          component="img"
                          height="190"
                          style={{ objectFit: 'cover' }}
                          image={product.image}
                        />
                      </Box>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {product.product_name}
                        </Typography>
                        <Select
                          value={selectedVariants[index] || ''}
                          onChange={(event) => handleVariantChange(event, index)}
                          style={{ margin: 5, width: '100%' }}
                        >
                          {product.variants.map((variant, variantIndex) => (
                            <MenuItem key={variantIndex} value={variant.id}>
                              {`${Math.round(variant.weight)} ${variant.weight_unit}`}
                              {variant.pricing.discount > 0 && (
                                <span
                                  style={{
                                    marginLeft: '8px',
                                    padding: '2px 6px',
                                    backgroundColor: 'rgba(0, 128, 0, 0.7)',
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                  }}
                                >
                                  {`${variant.pricing.discount}% off`}
                                </span>
                              )}
                            </MenuItem>
                          ))}
                        </Select>

                        {selectedVariants[index] && product.variants.find((variant) => variant.id === selectedVariants[index]) && (
                          <>
                            <Typography variant="body2" color="textSecondary">
                              Original Price: &#8377;{product.variants.find((variant) => variant.id === selectedVariants[index]).pricing.original_price}
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                              Discount Price: &#8377;{product.variants.find((variant) => variant.id === selectedVariants[index]).pricing.discount_price}
                            </Typography>
                          </>
                        )}



                      </CardContent>
                      <CardActions>
                        {selectedVariants[index] && product.variants.find((variant) => variant.id === selectedVariants[index]).stock_quantity ? (
                          <Button 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            fullWidth 
                            onClick={() => addToCart(selectedVariants[index])}
                          >
                            Add to Cart
                          </Button>
                        ) : (
                          <Button variant="contained" color="error" size="small" fullWidth
                          disabled
                          >
                            Out of Stock
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                      <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                        {snackbarMessage}
                      </Alert>
                    </Snackbar>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
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
      </Container>
      
    )
  )
  
}

export default HomePageContent