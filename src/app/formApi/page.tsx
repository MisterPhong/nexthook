'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation'

const ApiKeySecretKeyForm: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Mocked values for validation
  const mockedApiKey = 'api123';
  const mockedSecretKey = 'se123';

  const router = useRouter();

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const handleSecretKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecretKey(event.target.value);
  };

  const handleSubmit = () => {
    // Reset messages
    setError('');
    setSuccess('');

    // Validate API key and Secret key
    if (apiKey === mockedApiKey && secretKey === mockedSecretKey) {
      setSuccess('API Key and Secret Key are correct.');
      console.log('API Key:', apiKey);
      console.log('Secret Key:', secretKey);
      router.push('/form_order')
    } else {
      setError('Invalid API Key or Secret Key.');
      
    }
  };

  return (
    <div>
      <TextField
        label="API Key"
        variant="outlined"
        fullWidth
        value={apiKey}
        onChange={handleApiKeyChange}
        style={{ marginBottom: '1rem' }}
      />
      <TextField
        label="Secret Key"
        variant="outlined"
        fullWidth
        value={secretKey}
        onChange={handleSecretKeyChange}
        style={{ marginBottom: '1rem' }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      {error && <Alert severity="error" style={{ marginTop: '1rem' }}>{error}</Alert>}
      {success && <Alert severity="success" style={{ marginTop: '1rem' }}>{success}</Alert>}
    </div>
  );
};

export default ApiKeySecretKeyForm;
