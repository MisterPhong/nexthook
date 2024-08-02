'use client'
import { Forgot, ForgotSchema } from '@/app/common/types/forgot.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Button } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import CustomTextField from '../share/CustomTextField'

type Props = {}

export default function ForgotForm({ }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Forgot>({
        resolver: zodResolver(ForgotSchema),
    })

    return (
        <form onSubmit={handleSubmit((data) => {
            console.log(data)
        })}>
            <Box sx={{ mb: 2 }}>
                {/* <TextField
                    size='small'
                    fullWidth
                    variant="outlined"
                    placeholder="email address*"
                    margin="normal"
                    {...register("email", { required: true })}
                    helperText={
                        errors.email ? errors.email.message : "Email is required"
                      }
                    error={errors.email&&true}
                /> */}
                <CustomTextField
                    id="email"
                    label="Email"
                    // placeholder="email address*"
                    variant="outlined"
                    error={errors.email && true}
                    helperText={
                        errors.email ? errors.email.message : "Email is required"
                    }
                    {...register("email", { required: true })}
                    margin='normal'
                    fullWidth
                />
            </Box>
            <Button fullWidth variant="contained" color="primary" type='submit'>
                Continue
            </Button>
        </form>

    )
}