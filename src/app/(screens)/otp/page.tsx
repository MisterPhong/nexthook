'use client'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { emailSelector } from '@/app/common/store/slices/emailSlice'
import { useState } from 'react'
import { useSendOtp } from '@/app/common/hooks/useSendOpt'
// import { useMutation } from '@tanstack/react-query'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { httpClient } from '@/app/_components/services/httpClient'
import { server } from '@/app/common/constant/server'

export default function Otp() {
  const [otp, setOtp] = useState('')
  const emailReducer = useSelector(emailSelector)
  const mockOtpValue = '1234' // Mock OTP value
  // const [isError, setIsError] = useState(false)
  const { mutate, isLoading, isSuccess, isError, error } = useSendOtp()

  const handleChange = async (newValue: string) => {
    setOtp(newValue)
    if (newValue.length === 4) {
      // mutate(+newValue)
      const res = await httpClient.post(server.otp, { otp: +otp })
      console.log(res.data)
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
      <MuiOtpInput
        value={otp}
        onChange={handleChange}
        TextFieldsProps={{ error: true }}
      />
      Apply error prop
      {isError && (
        <div>
          Error: {error.message || 'An unknown error occurred'}
        </div>
      )}
    </div>
  )
}


{/* {isOtpComplete && <Typography color="primary" style={{ marginTop: '20px' }}>OTP Verified Successfully!</Typography>} */ }
{/* {errorMessage && <Typography color="error" style={{ marginTop: '20px' }}>{errorMessage}</Typography>} */ }