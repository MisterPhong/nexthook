'use client'

import { emailSelector } from '@/app/common/store/slices/emailSlice'
import { Box } from '@mui/material'
import { MuiOtpInput } from 'mui-one-time-password-input'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {}

export default function OtpForm({ }: Props) {
    const [otp, setOtp] = useState('')
    const emailReducer = useSelector(emailSelector)
    // const { mutate, isLoading, isSuccess, isError, error } = useSendOtp()
    
    const handleChange = async (newValue: string) => {
        setOtp(newValue)
        if (newValue.length === 4) {

        }
    }

    if (emailReducer.load) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <Box>
            <h1>{emailReducer.email!.slice(0, 2) + '******' + emailReducer.email!.slice(emailReducer.email!.indexOf('@'))}</h1>
            <MuiOtpInput
                value={otp}
                onChange={handleChange}
                TextFieldsProps={{ error: true }}
            />
        </Box>
    )
}