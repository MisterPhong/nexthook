'use client';
import React, { useState } from 'react';
import { Box, Typography, Avatar, TextField, Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';

const ProfilePage: React.FC = () => {
  const username = 'KKK';
  const email = 'kkk@kเวร.com';
  const profilePictureUrl = 'https://img.monomax.me/PSSbJq1aJ6gXroCwdtEZnqRP1X8=/monomax-obj.obs.ap-southeast-2.myhuaweicloud.com/assets/fileupload/picture/A-Better-Tomorrow_4.jpg';

  const [open, setOpen] = useState(false);
  const [apikey, setApikey] = useState('');
  const [seckey, setSeckey] = useState('');
  const [seed, setSeed] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setApikey(''); // Clear API key
    setSeckey(''); // Clear Secret key
    setSeed(''); // Clear Seed phrase
    setOpen(false); // Close the dialog
  };

  const handleApikeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApikey(event.target.value);
  };

  const handleSeckeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeckey(event.target.value);
  };

  const handleSeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeed(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('APIKey:', apikey);
    console.log('SecretKey:', seckey);
    console.log('SeedPherse:', seed);
    handleClose();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      bgcolor="#f5f5f5"
      padding={1}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={2}
      >
        <Avatar
          alt={username}
          src={profilePictureUrl}
          sx={{ width: 150, height: 150, marginBottom: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          {username}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {email}
        </Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Enter Key
      </Button>

      <Dialog open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '600px', // Set the desired width
            maxWidth: '80%', // Optional: limit the width to a percentage of the viewport width
          },
        }}
      >
        <DialogTitle>Enter Api key & Secrect Key</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              size='small'
              label="Api key"
              value={apikey}
              variant="outlined"
              margin="dense"
              onChange={handleApikeyChange}
              sx={{ marginBottom: 2, width: '500px' }}
            />
            <TextField
              size='small'
              label="Secret Key"
              value={seckey}
              variant="outlined"
              margin="dense"
              onChange={handleSeckeyChange}
              sx={{ marginBottom: 2, width: '500px' }}
            />
            <TextField
              size='small'
              label="Seed Phrase"
              value={seed}
              variant="outlined"
              margin="dense"
              onChange={handleSeedChange}
              sx={{ marginBottom: 2, width: '500px' }}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
