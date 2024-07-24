'use client'

import { useSendOtp } from '@/app/common/hooks/useSendOpt'
import { emailSelector } from '@/app/common/store/slices/emailSlice'
import { Box } from '@mui/material'
import { MuiOtpInput } from 'mui-one-time-password-input'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { routers } from '@/app/common/constant/path'

type Props = {}

export default function OtpForm({ }: Props) {
    const router = useRouter()
    const [otp, setOtp] = useState('')
    const emailReducer = useSelector(emailSelector)
    const {
        mutate,
        isError
    } = useSendOtp()

    const handleChange = async (newValue: string) => {
        setOtp(newValue)
        if (newValue.length === 4) {
            mutate(+newValue, {
                onSuccess: () => {
                    router.push(routers.predict)
                }
            })
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
            <h1 className='flex justify-center'>{emailReducer.email!.slice(0, 2) + '******' + emailReducer.email!.slice(emailReducer.email!.indexOf('@'))}</h1>
            <MuiOtpInput
                value={otp}
                onChange={handleChange}
                TextFieldsProps={{ error: isError }}
            />
        </Box>
    )
}