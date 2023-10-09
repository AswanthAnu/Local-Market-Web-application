import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <Typography variant="h4" color="textSecondary" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary">
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        style={{ marginTop: '20px' }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
