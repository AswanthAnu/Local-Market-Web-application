import React, { useState, useEffect } from 'react'
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Container, 
  Stack,
  Typography,
  Box,
  Button
} from '@mui/material'
import { ExpandMore } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import OrderAccordianSummary from './OrderAccordianSummary';
import OrderAccordianDetails from './OrderAccordianDetails';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'



const OrdersPage = () => {

  const [expandedPanel, setExpandedPanel] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = '/api/orders/'
    const token = localStorage.getItem('token')
    console.log("entered into order")
    fetch(apiUrl, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.json()).then((data) => {
      console.log(data, 'orders data')
      setOrders(data)
      
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data: ', error)
    })
  }, [])


  const handleAccordionChange = (panel) => (event, isExpanded) => {
    console.log({ event, isExpanded });
    setExpandedPanel(isExpanded ? panel : false);
  };

  const handleBackHome = () => {
    navigate('/');
  }

  return (
    !loading && (
      <Container maxWidth="lg" style={{ marginTop: '30px', marginBottom: '30px'}}>
        <Typography variant="h4"  style={{ marginBottom: '20px', fontWeight: 'bold', textAlign:'center'}}>
          Orders
        </Typography>
        {orders.length === 0 ? (
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
              There are no orders placed yet...!
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
          <Stack spacing={2}>
            
            {orders.map((order, index)=>(
            <Accordion expanded={expandedPanel === 'panel' + index } onChange={handleAccordionChange('panel' + index)}>

              <AccordionSummary  expandIcon={<ExpandMore />}>
                <OrderAccordianSummary order={order}/>
              </AccordionSummary>

              <AccordionDetails>
                <OrderAccordianDetails order={order}/>
              </AccordionDetails>

            </Accordion>
            ))}

          </Stack>
        )}
      </Container>
    )
  )
}

export default OrdersPage