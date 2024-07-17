'use client'
import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [otp, setOtp] = React.useState('');
  const [isOtpComplete, setIsOtpComplete] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isError, setIsError] = React.useState(false); // State to track error status
  const router = useRouter(); // Use useRouter for navigation

  const mockOtpValue = '1234'; // Mock OTP value

  const handleChange = (newValue: any) => {
    setOtp(newValue);
    setErrorMessage(''); // Clear any previous error messages
    setIsOtpComplete(false); // Reset OTP completion status
    setIsError(false); // Reset error status

    if (newValue.length === 4) {
      if (newValue === mockOtpValue) {
        console.log('Submitting OTP:', newValue);
        setIsOtpComplete(true);
        router.push('/form_api'); // ยิงไปฟอร์มapi ถ้าถูก
      } else {
        setErrorMessage('Incorrect OTP. Please try again.');
        setIsError(true); // อยู่นี่ ถ้าผิด
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <MuiOtpInput value={otp} onChange={handleChange} TextFieldsProps={{ error: isError }} /> {/* Apply error prop */}
      {errorMessage && <Typography color="error" style={{ marginTop: '20px' }}>{errorMessage}</Typography>}
      {isOtpComplete && <Typography color="primary" style={{ marginTop: '20px' }}>OTP Verified Successfully!</Typography>}
    </div>
  );
};

export default Page;
