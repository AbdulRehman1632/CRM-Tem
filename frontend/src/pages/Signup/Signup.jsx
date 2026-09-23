
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person, Key, MarkEmailRead } from '@mui/icons-material';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Backend API URL
  const API_URL = 'http://localhost:5000/api/auth';

  // Password Validation Regex
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!PASSWORD_REGEX.test(password)) {
      setError(
        'Password must be 6+ chars & include uppercase, lowercase, number and special character (@$!%*?&).'
      );
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/send-otp`, { name, email, password });
      setMessage(res.data.message || 'Verification code sent to your email!');
      setIsOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/verify-otp`, { email, otp });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP code.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('Google Credential:', credentialResponse);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        py: 4,
        px: 2
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: '#ffffff',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }}
        >
          <Box textContent="center" sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
              {isOtpSent ? 'Verify OTP' : 'Create Account'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {isOtpSent
                ? `Enter the 6-digit code sent to ${email}`
                : 'Sign up to get started with our platform'}
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          {!isOtpSent ? (
            <Box component="form" onSubmit={handleSendOtp}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                helperText="Min 6 chars: 1 Upper, 1 Lower, 1 Number, 1 Special Char"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.2,
                  fontWeight: 'bold',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Verification Code'}
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleVerifyOtp}>
              <TextField
                fullWidth
                label="6-Digit Verification Code"
                variant="outlined"
                margin="normal"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                inputProps={{ maxLength: 6, style: { textAlign: 'center', letterSpacing: '8px', fontSize: '1.2rem' } }}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Key color="action" />
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                size="large"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 1.5,
                  py: 1.2,
                  fontWeight: 'bold',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify & Complete Signup'}
              </Button>

              <Button
                fullWidth
                variant="text"
                color="secondary"
                onClick={() => setIsOtpSent(false)}
                sx={{ textTransform: 'none' }}
              >
                Edit Email / Go Back
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="textSecondary">
              OR
            </Typography>
          </Divider>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Sign-In failed')}
              useOneTap={false}
              shape="pill"
            />
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Typography
                component={RouterLink}
                to="/login"
                variant="body2"
                color="primary"
                sx={{ fontWeight: 'bold', textDecoration: 'none' }}
              >
                Login
              </Typography>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;