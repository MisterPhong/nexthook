'use client'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { emailSelector } from '@/app/common/store/slices/emailSlice'
import { useState } from 'react'
import { useSendOtp } from '@/app/common/hooks/useSendOpt'
// import { useMutation } from '@tanstack/react-query'

export default function Otp() {
  const [otp, setOtp] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter() // Use useRouter for navigation
  const emailReducer = useSelector(emailSelector)
  const mockOtpValue = '1234' // Mock OTP value
  const { mutate, isLoading, isSuccess, error } = useSendOtp()

  const handleChange = (newValue: string) => {
    setOtp(newValue)

    if (newValue.length === 4) {
      if (newValue === mockOtpValue) {
        console.log('Submitting OTP:', newValue)
      }
    }
  }

  if (emailReducer.load) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>{emailReducer.email!.slice(0, 2) + '******' + emailReducer.email!.slice(emailReducer.email!.indexOf('@'))}</h1>
      <MuiOtpInput value={otp} onChange={handleChange} TextFieldsProps={{ error: isError }} /> Apply error prop
      {/* {errorMessage && <Typography color="error" style={{ marginTop: '20px' }}>{errorMessage}</Typography>} */}
      {/* {isOtpComplete && <Typography color="primary" style={{ marginTop: '20px' }}>OTP Verified Successfully!</Typography>} */}
    </div>
  )
}