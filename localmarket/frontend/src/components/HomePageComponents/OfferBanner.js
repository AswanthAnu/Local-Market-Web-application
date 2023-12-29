import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const OfferBanner = () => {
  const [offers, setOffers] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/offers/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOffers(data.offers);
        console.log('Data in offer', data);
      } catch (error) {
        console.error('Error finding offers: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (offers.length > 0 && !loading) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % offers.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [loading, offers, currentImageIndex]);

  console.log('Current Image Index:', currentImageIndex);
  console.log('Offers:', offers);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper elevation={3} style={{ padding: '0', height: '100%' }}>
        <div style={{ textAlign: 'center', height: '100%' }}>
            {offers.length > 0 && (
            <img
                src={offers[currentImageIndex].image}
                alt="Offer Image"
                style={{
                width: '100%', // Set width to 100% of the container
                height: '150px', // Set height to 100% of the container
                objectFit: 'cover', // Maintain aspect ratio and cover the container
                boxSizing: 'border-box', // Include padding in width and height
                }}
            />
            )}
        </div>
    </Paper>


  );
};

export default OfferBanner;
