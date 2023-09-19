import React from 'react'
import { 
    Paper,
    Grid 
} from '@mui/material'
import Cards from './Cards'

const CartItemsCard = ({cartitems}) => {
  return (
    <Grid 
        item 
        xs={12} 
        md={8} 
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
            { cartitems.map((cartitem, index) => (
                <Cards 
                    cartitem={cartitem}
                    index={index}
                />
                            )
                        )
            }
        </Paper>
    </Grid>
  )
}

export default CartItemsCard