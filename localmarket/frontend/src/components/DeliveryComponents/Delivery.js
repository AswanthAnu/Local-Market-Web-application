import React, {useState, useEffect} from 'react'
import { 
  Container, 
  Typography
} from '@mui/material'
import DeliveryTabs from './DeliveryTabs';
import { useNavigate } from 'react-router-dom';


const Delivery = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = '/api/orders/'
    const token = localStorage.getItem('token')
    console.log("entered into delivery")
    fetch(apiUrl, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.json()).then((data) => {
      setOrders(data)
      
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data: ', error)
    })
  }, [])


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
      </Container>
    )
  )
}

export default Delivery