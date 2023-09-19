import React, { useState } from 'react'
import { 
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material'
import { ExpandMore } from '@material-ui/icons';
import DeliveryAccordionDetails from './DeliveryAccordionDetails';
import DeliveryAccordionSummary from './DeliveryAccordionSummary';



const PendingAccordian = ({orders}) => {

    const [expandedPanel, setExpandedPanel] = useState(false);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        console.log({ event, isExpanded });
        setExpandedPanel(isExpanded ? panel : false);
    };

  return (
    <Stack spacing={2}>
        
        {orders.map((order, index)=>(
        <Accordion expanded={expandedPanel === 'panel' + index } onChange={handleAccordionChange('panel' + index)}>

          <AccordionSummary  expandIcon={<ExpandMore />}>
            <DeliveryAccordionSummary order={order} />
          </AccordionSummary>

          <AccordionDetails>
            <DeliveryAccordionDetails order={order}/>
          </AccordionDetails>

        </Accordion>
        ))}

      </Stack>
  )
}

export default PendingAccordian