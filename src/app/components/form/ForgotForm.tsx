'use client'

import { Forgot, ForgotSchema } from '@/app/common/types/forgot.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomTextField from '../share/CustomTextField'
import { useRouter } from 'next/navigation'
import { routers } from '@/app/common/constant/path'
import { httpClient } from '@/app/common/services/httpClient'
import { server } from '@/app/common/constant/server'
import { useChallenge } from '@/app/common/hooks/useChallenge'
import { useAppDispatch } from '@/app/common/store/store'
import { setEmail } from '@/app/common/store/slices/emailSlice'

type Props = {}

export default function ForgotForm({}: Props) {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Forgot>({
        resolver: zodResolver(ForgotSchema),
    })
    const { mutate } = useChallenge()
    const dispatch = useAppDispatch()

    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                console.log(data)
                mutate(data, {
                    onSuccess: () => {
                        router.push(routers.resetPassword)
                        dispatch(setEmail(data.email))
                    },
                })
            })}
        >
            <Box sx={{ mb: 2 }}>
                <CustomTextField
                    id='email'
                    label='Email'
                    // placeholder="email address*"
                    variant='outlined'
                    error={errors.email && true}
                    helperText={
                        errors.email
                            ? errors.email.message
                            : 'Email is required'
                    }
                    {...register('email', { required: true })}
                    margin='normal'
                    fullWidth
                />
            </Box>
            <Button fullWidth variant='contained' color='primary' type='submit'>
                Continue
            </Button>
        </form>
    )
}
