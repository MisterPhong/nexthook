'use client';
import React, { useState } from 'react';
import { Box, Typography, Avatar, TextField, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState('KKK');
  const [email, setEmail] = useState('kkk@kเวร.com');
  const profilePictureUrl = 'https://img.monomax.me/PSSbJq1aJ6gXroCwdtEZnqRP1X8=/monomax-obj.obs.ap-southeast-2.myhuaweicloud.com/assets/fileupload/picture/A-Better-Tomorrow_4.jpg';

  const [openKeyDialog, setOpenKeyDialog] = useState(false);
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
  const [apikey, setApikey] = useState('');
  const [seckey, setSeckey] = useState('');
  const [seed, setSeed] = useState('');
  const [editUsername, setEditUsername] = useState(username);
  const [editEmail, setEditEmail] = useState(email);

  const handleClickOpenKeyDialog = () => setOpenKeyDialog(true);
  const handleCloseKeyDialog = () => {
    setApikey('');
    setSeckey('');
    setSeed('');
    setOpenKeyDialog(false);
  };

  const handleClickOpenEditProfileDialog = () => setOpenEditProfileDialog(true);
  const handleCloseEditProfileDialog = () => setOpenEditProfileDialog(false);

  const handleApikeyChange = (event: React.ChangeEvent<HTMLInputElement>) => setApikey(event.target.value);
  const handleSeckeyChange = (event: React.ChangeEvent<HTMLInputElement>) => setSeckey(event.target.value);
  const handleSeedChange = (event: React.ChangeEvent<HTMLInputElement>) => setSeed(event.target.value);

  const handleEditUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditUsername(event.target.value);
  const handleEditEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditEmail(event.target.value);

  const handleSubmitKeyDialog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('APIKey:', apikey);
    console.log('SecretKey:', seckey);
    console.log('SeedPhrase:', seed);
    handleCloseKeyDialog();
  };

  const handleSubmitEditProfileDialog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUsername(editUsername);
    setEmail(editEmail);
    handleCloseEditProfileDialog();
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
      <Button variant="contained" color="primary" onClick={handleClickOpenKeyDialog}>
        Enter Key
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClickOpenEditProfileDialog} sx={{ marginTop: 2 }}>
        Edit Profile
      </Button>

      <Dialog open={openKeyDialog} onClose={handleCloseKeyDialog}
        PaperProps={{
          style: {
            width: '600px',
            maxWidth: '80%',
          },
        }}
      >
        <DialogTitle sx={{ marginBottom: 2 }}>Enter API Key & Secret Key</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmitKeyDialog}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              size="small"
              label="API Key"
              value={apikey}
              variant="outlined"
              margin="dense"
              onChange={handleApikeyChange}
              sx={{ marginBottom: 2, width: '500px' }}
            />
            <TextField
              size="small"
              label="Secret Key"
              value={seckey}
              variant="outlined"
              margin="dense"
              onChange={handleSeckeyChange}
              sx={{ marginBottom: 2, width: '500px' }}
            />
            <TextField
              size="small"
              label="Seed Phrase"
              value={seed}
              variant="outlined"
              margin="dense"
              onChange={handleSeedChange}
              sx={{ marginBottom: 2, width: '500px' }}
            />
            <DialogActions>
              <Button onClick={handleCloseKeyDialog}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditProfileDialog} onClose={handleCloseEditProfileDialog}
        PaperProps={{
          style: {
            width: '600px',
            maxWidth: '80%',
          },
        }}
      >
        <DialogTitle sx={{ marginBottom: 2 }}>Edit Profile</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmitEditProfileDialog}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              size="small"
              label="Username"
              value={editUsername}
              variant="outlined"
              margin="dense"
              onChange={handleEditUsernameChange}
              sx={{ marginBottom: 2, width: '500px' }}
            />
            <TextField
              size="small"
              label="Email"
              value={editEmail}
              variant="outlined"
              margin="dense"
              onChange={handleEditEmailChange}
              sx={{ marginBottom: 2, width: '500px' }}
            />
            <DialogActions>
              <Button onClick={handleCloseEditProfileDialog}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
