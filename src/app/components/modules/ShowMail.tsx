'use client'

import { forgotSelector } from '@/app/common/store/slices/forgotSlice'
import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {}

export default function ShowMail({}: Props) {
    const forgotReducer = useSelector(forgotSelector)

    return (
        <Typography align='center' paragraph color='textSecondary'>
            {forgotReducer.email} for instructions to reset your password.
        </Typography>
    )
}
