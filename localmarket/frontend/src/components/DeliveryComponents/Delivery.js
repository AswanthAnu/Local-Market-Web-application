import React, {useState, useEffect} from 'react'
import { 
  Container, 
  Typography,
  Grid,
  Pagination,
  Box
} from '@mui/material'
import DeliveryTabs from './DeliveryTabs';
import { useNavigate } from 'react-router-dom';


const Delivery = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `/api/delivery/?page=${currentPage}`
    const token = localStorage.getItem('token')
    console.log("entered into delivery")
    fetch(apiUrl, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.json()).then((data) => {
      setOrders(data.order_items)
      setTotalPages(Math.ceil(data.total_orders/6));
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data: ', error)
    })
  }, [currentPage])

  const handlePageChange = (event, newPage) => {
    console.log("newPage:", newPage);
    console.log("totalPages:", totalPages);
    setLoading(true)
    if (newPage >= 1 && newPage <= totalPages) {
      console.log('entered into if')
      setCurrentPage(newPage);
    }
  };


  return (
    !loading && (
      <Container maxWidth="lg" style={{ marginTop: '30px', marginBottom: '30px'}}>
        <Typography variant="h4"  style={{ marginBottom: '20px', fontWeight: 'bold', textAlign:'center'}}>
          Delivery Details
        </Typography> 
        <DeliveryTabs 
          orders={orders}
          setOrders={setOrders}
        />
        {totalPages > 1 ? (
        <Grid container justifyContent="center">
          <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
            />
          </Box>
        </Grid>
        ):(<Grid>

        </Grid>)}
      </Container>
    )
  )
}

export default Delivery