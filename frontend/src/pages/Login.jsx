import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Grid,
  Container,
  Divider,
} from '@mui/material';
// import { Link } from 'react-router-dom';
import { AiFillLock } from 'react-icons/ai';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
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
      <AiFillLock size={50} color="#0288d1" />
      <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 4 }}>
        Log in
      </Typography>

      {/* Error Message */}
      {errorMessage && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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

        {/* Forgot password link */}
        {/* <Grid container sx={{ mt: 2 }}>
          <Grid item xs>
            <MuiLink href="#" variant="body2" color="primary">
              Forgot password?
            </MuiLink>
          </Grid>
        </Grid> */}

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
          Log in
        </Button>
      </form>

      {/* Divider */}
      <Divider sx={{ width: '100%', my: 2 }}>or</Divider>

      {/* Sign Up Link */}
      <Typography>
        Not a member yet?{' '}
        <Link to="/register">
          <MuiLink component="span" variant="body2" color="primary">
            Register
          </MuiLink>
        </Link>
      </Typography>
    </Box>
  </Container>
  );
};

export default Login;
