'use client'

import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function Widget() {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const handleClickOpen = (content: string) => {
    setDialogContent(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-background rounded-lg shadow-md">
      <img className="w-24 h-24 rounded-full border-4 border-primary" src="https://placehold.co/100x100?text=🔥" alt="User Profile Picture" />
      <h2 className="mt-4 text-lg font-semibold text-foreground">KKK</h2>
      <p className="text-muted-foreground">kkk@k135.com</p>
      <Button 
        className="mt-4 bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-lg" 
        onClick={() => handleClickOpen('Enter Key Dialog Content')}
      >
        Enter Key
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogContent}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the required information.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="api"
            label="api key"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="sec"
            label="secrect key"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
