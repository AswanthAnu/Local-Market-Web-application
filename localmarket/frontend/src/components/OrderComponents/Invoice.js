import React, { useState } from "react";
import {
    Button, 
    Grid, 
    Dialog,
    DialogActions,
    DialogTitile,
    DialogContent,
    Typography
}from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: "#117a2d",
      color: "white",
      "&:hover": {
        backgroundColor: "#004225"
      },
    },
  }));

const Invoice = ({order_id}) => {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false)
    const [message, setMessage] = useState('')

    // const handleDownload = () => {
    //     try {
    //         fetch(`/api/get-ivoice/?phone_number=${phoneNumber}`)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error("Network response was not ok")
    //             }
    //             return response.json()
    //         })
    //         .then(data => {
    //             if (data.message){
    //                 setMessage(data.message)
    //             }else{
    //                 setMessage('Something went wrong. Please try again later.')
    //             }
    //             setDialogOpen(true)

    //         })
    //         .catch(error => {
    //             console.error('Error fetching coordinates:', error)
    //             setMessage("Invoice not available")
    //             setDialogOpen(true)
    //         })
    //     } catch (error) {
    //         console.errot("Error in try block:", error)
    //         setMessage("Invoice not available!")
    //         setDialogOpen(true)
    //     }
    // }

    const handleDownload = () => {
        try {
            // Update the API endpoint to match your Django URL pattern
            fetch(`/api/download_invoice/${order_id}/`)
            
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.blob(); 
                })

                .then(blob => {
                    // Create a download link and trigger a click to start the download
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `invoice_${order_id}.pdf`;
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => {
                    console.error('Error fetching invoice:', error);
                    setMessage("Invoice not available");
                    setDialogOpen(true);
                });
        } catch (error) {
            console.error("Error in try block:", error);
            setMessage("Invoice not available!");
            setDialogOpen(true);
        }
    };

    const handleclosedialog = () => {
        setDialogOpen(false)
    }

  return (
    <Grid item xs={6}>
      <Button className={classes.button} onClick={handleDownload}>
        Invoice
      </Button>
      <Dialog open={dialogOpen} onClose={handleclosedialog}>
        {/* <DialogTitle style={{ color: 'red', textAlign: 'center' }} >
          Something went wrong...!
        </DialogTitle> */}
        <DialogContent>
          <Typography >
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleclosedialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default Invoice