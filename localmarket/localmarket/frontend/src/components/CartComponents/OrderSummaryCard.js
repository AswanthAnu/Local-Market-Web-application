import React from 'react'
import { 
    Paper, 
    Grid 
} from '@mui/material'
import OrderSummary from './OrderSummary'

const OrderSummaryCard = ({cartitems}) => {
  return (
    <Grid 
        item 
        xs={12} 
        md={4} 
        lg={4}
    >
        <Paper
            elevation={3}
            sx={{
            flex: 1, 
            m: 1,
            padding: '32px'
            }}
            >
            <OrderSummary cartitems={cartitems}/>
        </Paper>
    </Grid>
  )
}

export default OrderSummaryCard