import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

const LoginCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    // Replace this with your actual login logic
    if (username === 'yourUsername' && password === 'yourPassword') {
      // Successful login logic
      setError(false);
    } else {
      // Failed login logic
      setError(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Card style={{ marginTop: '20px' }}>
        <div style={{ backgroundColor: 'rgb(46, 125, 50)', textAlign: 'center', padding: '16px'}}>
          <LocalFloristIcon style={{ fontSize: '48px', color: 'white' }} />
          <Typography variant="h6" style={{ color: 'white', marginTop: '8px' }}>
            Local Market
          </Typography>
        </div>

        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error} // Set error prop to display error state
            helperText={error && 'Incorrect credentials. Please try again.'} // Display error message
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            style={{ marginTop: '16px', backgroundColor: 'rgb(46, 125, 50)', color: 'white' }}
          >
            Login
          </Button>
          <Typography variant="body2" style={{ textAlign: 'center', marginTop: '16px' }}>
            New user? <Link href="/register">Register here</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginCard;
