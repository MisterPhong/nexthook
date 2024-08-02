'use client'
import { Forgot, ForgotSchema } from '@/app/common/types/forgot.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField, Button } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import CustomTextField from '../share/CustomTextField'
import OtpDialog from '../modules/OtpDialog'

type Props = {}

export default function ForgotForm({ }: Props) {
    const [open, setOpen] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Forgot>({
        resolver: zodResolver(ForgotSchema),
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit((data) => {
                console.log(data)
                handleClickOpen()
            })}>
                <Box sx={{ mb: 2 }}>
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

            <OtpDialog
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                open={open}
            />
        </>


    )
}