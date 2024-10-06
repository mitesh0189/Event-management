import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Container,
  Grid,
  Divider,
} from '@mui/material';
import { FaUserPlus } from 'react-icons/fa';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 2,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        {/* Icon and Title */}
        <FaUserPlus size={50} color="#0288d1" />
        <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 4 }}>
          Register
        </Typography>

        {/* Error Message */}
        {errorMessage && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            id="username"
            label="Username"
            variant="outlined"
            margin="normal"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#0288d1',
              '&:hover': { backgroundColor: '#0277bd' },
            }}
          >
            Register
          </Button>
        </form>

        {/* Divider */}
        <Divider sx={{ width: '100%', my: 2 }}>or</Divider>

        {/* Sign In Link */}
        <Typography>
          Already have an account?{' '}
          <MuiLink component={Link} to="/login" color="primary">
            Log in
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
