import React from 'react'
import { 
    Grid, Paper 
} from '@mui/material'
import CustomerForm from './CustomerForm'

const CustomerDetailsPaper = () => {
  return (
    <Grid 
        item 
        xs={12} 
        md={6} 
        lg={8}
    >
        <Paper
            elevation={3}
            sx={{
            flex: 1, 
            m: 1,
            padding: '12px'
            }}
        >
            <CustomerForm />
        </Paper>
    </Grid>
  )
}

export default CustomerDetailsPaper