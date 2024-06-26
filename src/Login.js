import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAuth } from './context/AuthContext';
import axiosInstance from './services/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authString = btoa(`${email}:${password}`);
      const response = await axiosInstance.post(
        '/login',
        {},
        {
          headers: {
            Authorization: `Basic ${authString}`
          }
        }
      );

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        setIsAuthenticated(true);
        navigate('/');
      } else {
        setError('Invalid login credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Login
      </Button>
      <Link to="/create-user" style={{ marginTop: '10px', textDecoration: 'none' }}>
        <Button variant="outlined">Create Account</Button>
      </Link>
    </Box>
  );
};

export default Login;
