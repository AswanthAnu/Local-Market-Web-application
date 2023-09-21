import React from 'react'
import { 
    Grid, 
    Paper,
} from '@mui/material'
import OrderSummary from './OrderSummary'

const OrderSummaryPaper = ({cartitems}) => {
  return (
    <Grid 
        item 
        xs={12} 
        md={6} 
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

export default OrderSummaryPaper