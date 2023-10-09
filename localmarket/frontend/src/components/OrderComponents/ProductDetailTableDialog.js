import React, { useState } from 'react'
import { 
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material'
import ProductDetailTable from './ProductDetailTable'


const ProductDetailTableDialog = ({open, setOpen, orderItems}) => {
   
  return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        PaperProps={{ style: { maxWidth: "120vh" } }}
    >
        <DialogTitle id='dialog-title'>Product List</DialogTitle>
        <DialogContent>
            <DialogContentText id='dialog-descripton'>
                <ProductDetailTable orderItems={orderItems}/>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)}> Close </Button>
        </DialogActions>
    </Dialog>
  )
}

export default ProductDetailTableDialog