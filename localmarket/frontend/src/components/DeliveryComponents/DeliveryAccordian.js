import React, { useState } from 'react'
import { 
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    Button    
} from '@mui/material'
import { ExpandMore } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import DeliveryAccordionDetails from './DeliveryAccordionDetails';
import DeliveryAccordionSummary from './DeliveryAccordionSummary';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'



const PendingAccordian = ({orders, setOrders}) => {

    const [expandedPanel, setExpandedPanel] = useState(false);
    const navigate = useNavigate();

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        console.log({ event, isExpanded });
        setExpandedPanel(isExpanded ? panel : false);
    };

    const handleBackHome = () => {
      navigate('/');
    }

  return (
    <>
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
            It is empty. Nothing delivered yet.
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
                <DeliveryAccordionSummary order={order} />
              </AccordionSummary>
    
              <AccordionDetails>
                <DeliveryAccordionDetails order={order} setOrders={setOrders}/>
              </AccordionDetails>
    
            </Accordion>
          ))}
        </Stack>
      )}
    </>
  )
}

export default PendingAccordian