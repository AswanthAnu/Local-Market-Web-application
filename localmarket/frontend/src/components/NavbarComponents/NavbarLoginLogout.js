import React, { useState, useEffect } from 'react';
import { Button, Stack, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

const NavbarLoginLogout = ({}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = async () => {
    console.log(localStorage.getItem('token'), 'token-1')
    try {
      const response = await fetch('/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        console.log("good response", response)
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setSnackbarMessage('Logged out successfully');
        setSnackbarOpen(true);
      } else {
        console.error('Logout error:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Stack>
      {isAuthenticated ? (
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      )}
       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert severity="success" onClose={handleSnackbarClose}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    </Stack>
  );
};

export default NavbarLoginLogout;
