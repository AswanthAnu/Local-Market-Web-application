import React, { useState } from 'react'
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
        Select
      } from '@mui/material';
import SearchField from '../SearchFieldComponents/SearchField';

const ProductData = [
  {
    product_name : "Capsicum",
    Product_variant : {
      '500 g' : { 
        og_price : 100,
        discount : 20,
        ds_price : 80,
      },
      '1 kg' : { 
        og_price : 200,
        discount : 20,
        ds_price : 160,
      },
      '2 kg' : { 
        og_price : 400,
        discount : 20,
        ds_price : 320,
      },

    }, 
    image : 'static/images/cards/capsicum.jpg' 

  },
  {
    product_name : "Capsicum",
    Product_variant : {
      '500 g' : { 
        og_price : 100,
        discount : 20,
        ds_price : 80,
      },
      '1 kg' : { 
        og_price : 200,
        discount : 20,
        ds_price : 160,
      },
      '2 kg' : { 
        og_price : 400,
        discount : 20,
        ds_price : 320,
      },

    },
    image : 'static/images/cards/capsicum.jpg' 

  },
  {
    product_name : "Capsicum",
    Product_variant : {
      '500 g' : { 
        og_price : 100,
        discount : 20,
        ds_price : 80,
      },
      '1 kg' : { 
        og_price : 200,
        discount : 20,
        ds_price : 160,
      },
      '2 kg' : { 
        og_price : 400,
        discount : 20,
        ds_price : 320,
      },

    },
    image : 'static/images/cards/capsicum.jpg'  

  },
  {
    product_name : "Capsicum",
    Product_variant : {
      '500 g' : { 
        og_price : 100,
        discount : 20,
        ds_price : 80,
      },
      '1 kg' : { 
        og_price : 200,
        discount : 20,
        ds_price : 160,
      },
      '2 kg' : { 
        og_price : 400,
        discount : 20,
        ds_price : 320,
      },

    },
    image : 'static/images/cards/capsicum.jpg'  

  },
  {
    product_name : "Capsicum",
    Product_variant : {
      '500 g' : { 
        og_price : 100,
        discount : 20,
        ds_price : 80,
      },
      '1 kg' : { 
        og_price : 200,
        discount : 20,
        ds_price : 160,
      },
      '2 kg' : { 
        og_price : 400,
        discount : 20,
        ds_price : 320,
      },

    },
    image : 'static/images/cards/capsicum.jpg' 

  },
  {
    product_name : "Capsicum",
    Product_variant : {
      '400 g' : { 
        og_price : 100,
        discount : 20,
        ds_price : 80,
      },
      '1 kg' : { 
        og_price : 200,
        discount : 20,
        ds_price : 160,
      },
      '2 kg' : { 
        og_price : 400,
        discount : 20,
        ds_price : 320,
      },

    },
    image : 'static/images/cards/capsicum.jpg' 

  }
]

const HomePageContent = () => {

  const [orginalPrice, setOrginalPrice] = useState('k')
  const key = Object.keys(ProductData[0].Product_variant)[0]
  const value = ProductData[0].Product_variant[key].og_price
  console.log(value)

  const [selectedVariants, setSelectedVariants] = useState(ProductData.map(() => null));

  const handleVariantChange = (event, productIndex) => {
    const variantKey = event.target.value;
    const updatedVariants = [...selectedVariants];
    updatedVariants[productIndex] = variantKey;
    setSelectedVariants(updatedVariants);
  };

  return (

    <Container maxWidth="lg" style={{ marginTop: '30px', marginBottom: '30px'}}>
      <SearchField />
      <div >
        <Grid container spacing={2}>
          {ProductData.map((product, index) => (
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
                    {product.Product_variant[selectedVariants[index] || Object.keys(product.Product_variant)[0]].discount}%
                  </Typography>
                  <CardMedia
                    component="img"
                    height="190"
                    style={{ objectFit: 'cover' }}
                    image={product.image}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.product_name}
                  </Typography>
                  <Select
                    value={selectedVariants[index] || Object.keys(product.Product_variant)[0]}
                    onChange={(event) => handleVariantChange(event, index)}
                    style={{ margin: 5, width: '100%' }}
                  >
                    {Object.keys(product.Product_variant).map((variantKey, variantIndex) => (
                      <MenuItem key={variantIndex} value={variantKey}>
                        {variantKey}
                      </MenuItem>
                    ))}
                  </Select>

                  <Typography variant="body2" 
                              color="textSecondary" 
                              style={{ display: 'flex', 
                              alignItems: 'center' }}
                  >
                    Original Price: <span style={{ 
                                                  color: 'grey', 
                                                  textDecoration: 'line-through', 
                                                  marginRight: '5px' 
                                                  }}
                                      >
                                        &#8377;
                                      </span>
                    {product.Product_variant[selectedVariants[index] || Object.keys(product.Product_variant)[0]].og_price}
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    Discount Price: <span style={{ color: 'black', marginRight: '5px' }}>&#8377;</span>
                    <strong>
                      {product.Product_variant[selectedVariants[index] || Object.keys(product.Product_variant)[0]].ds_price}
                    </strong>
                  </Typography>



                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary" size="small" fullWidth>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
  </Container>
  )
  
}

export default HomePageContent