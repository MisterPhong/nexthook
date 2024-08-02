'use client'
import React from 'react';
import { Card, CardContent, Typography, TextField, Button, Link, Box } from '@mui/material';
import { styled } from '@mui/system';
import { routers } from "@/app/common/constant/path";

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: 'background',
});

const FormContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(5),
  maxWidth: 500,
  width: '100%',
}));

const LogoContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '16px',
});

const ForgotPassword = () => {
  return (
    <Container>
      <Card>
        <CardContent>
          <FormContainer>
          <LogoContainer>
                <img
                    alt="logo"
                    src="https://www.nasa.gov/wp-content/uploads/2023/04/nasa-logo-web-rgb.png"
                    style={{ width: '100px', height: 'auto' }} // Adjust the width and height as needed
                />
            </LogoContainer>
            <Typography variant="h5" align="center" gutterBottom>
              Forgot Your Password?้
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" paragraph>
              Enter your email address and we will send you instructions to reset your password.
            </Typography>
            <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="email address*"
              margin="normal"
            />
            </Box>
            <Button fullWidth variant="contained" color="primary">
              Continue
            </Button>
            <Typography align="center" marginTop="16px">
              <Link href={routers.login} color="secondary">
                Back to Login
              </Link>
            </Typography>
            <Typography align="center" marginTop="32px" color="textSecondary">
              Don't have an account?{' '}
              <Link href={routers.signup} color="secondary">
                Sign Up
              </Link>
            </Typography>
          </FormContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
