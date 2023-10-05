import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Snackbar,
  Grid,
  Alert,
} from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

const RegisterCard = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Added state for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Added state for Snackbar

  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !password1 || !password2) {
      setError(true);
      setErrorMessage('All fields are required.');
      setPassword1('');
      setPassword2('');
      return;
    }

    if (password1 !== password2) {
      setErrorPassword(true);
      setErrorMessage('Passwords do not match.');
      setPassword2('');
      return;
    }

    const registrationData = {
      first_name: firstName,
      last_name: lastName,
      username,
      password: password1,
    };

    try {
      const response = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        setSnackbarMessage('Registered successfully');
        setSnackbarOpen(true);
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        setError(true);
        setErrorMessage(errorData.detail || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // Function to handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xs">
      <Card style={{ marginTop: '20px' }}>
        <div style={{ backgroundColor: 'rgb(46, 125, 50)', textAlign: 'center', padding: '16px' }}>
          <LocalFloristIcon style={{ fontSize: '48px', color: 'white' }} />
          <Typography variant="h6" style={{ color: 'white', marginTop: '8px' }}>
            Local Market
          </Typography>
        </div>

        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            Register
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                error={errorPassword}
                helperText={errorPassword && 'Passwords do not match.'}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
            style={{ marginTop: '16px', backgroundColor: 'rgb(46, 125, 50)', color: 'white' }}
          >
            Register
          </Button>
          {error && (
            <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(false)}>
              <Alert severity="error" onClose={() => setError(false)}>
                {errorMessage}
              </Alert>
            </Snackbar>
          )}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert severity="success" onClose={handleSnackbarClose}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <Typography variant="body2" style={{ textAlign: 'center', marginTop: '16px' }}>
            Already have an account? <Link href="/login">Login here</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterCard;
