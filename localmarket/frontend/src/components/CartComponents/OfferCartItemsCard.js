import React from 'react'
import { 
    Paper,
    Grid 
} from '@mui/material'
import OfferCards from './OfferCards'

const OfferCartItemsCard = ({freeitems}) => {
    console.log(freeitems, "offer card items")
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
            { freeitems.map((freeitem, index) => (
                <OfferCards 
                    freeitem={freeitem}
                    index={index} 
                />
                            )
                        )
            }
        </Paper>
    </Grid>
  )
}

export default OfferCartItemsCard