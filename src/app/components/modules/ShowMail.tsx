'use client'
import { emailSelector } from '@/app/common/store/slices/emailSlice'
import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {}

export default function ShowMail({}: Props) {
    const emailReducer = useSelector(emailSelector)

    // if (emailReducer.load) {
    //     return <div className='spinner'></div>
    // }

    return (
        <Typography align='center' paragraph color='textSecondary'>
            {emailReducer.email} for instructions to reset your password.
        </Typography>
    )
}
