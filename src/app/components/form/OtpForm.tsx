'use client'

import { useSendOtp } from '@/app/common/hooks/useSendOpt'
import { MuiOtpInput } from 'mui-one-time-password-input'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { routers } from '@/app/common/constant/path'

type Props = {}

export default function OtpForm({}: Props) {
    const router = useRouter()
    const [otp, setOtp] = useState('')
    const { mutate, isError } = useSendOtp()

    const handleChange = async (newValue: string) => {
        setOtp(newValue)
        if (newValue.length === 4) {
            mutate(+newValue, {
                onSuccess: () => {
                    router.push(routers.landing)
                },
            })
        }
    }

    return (
        <MuiOtpInput
            value={otp}
            onChange={handleChange}
            TextFieldsProps={{ error: isError }}
        />
    )
}
