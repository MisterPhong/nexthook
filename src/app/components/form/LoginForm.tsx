'use client'
import { Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Link from 'next/link'
import { Link as LinkMui } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Login, LoginSchema } from '@/app/common/types/auth.type'
import { useRouter } from 'next/navigation'
import { routers } from '@/app/common/constant/path'
import CustomTextField from '../share/CustomTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import ResponsiveDialog from '../modules/ResponsiveDialog'
import { useSignin } from '@/app/common/hooks/useSignin'

type Props = {}

export default function LoginForm({}: Props) {
    const router = useRouter()
    const { mutate, isPending, isError } = useSignin()
    const [open, setOpen] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Login>({
        resolver: zodResolver(LoginSchema),
    })

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <Stack
                spacing={2}
                component={'form'}
                onSubmit={handleSubmit((data) => {
                    mutate(data, {
                        onSuccess: () => {
                            handleClickOpen()
                        },
                    })
                })}
            >
                <Stack spacing={1}>
                    <CustomTextField
                        id='username'
                        label='Username'
                        variant='outlined'
                        error={!!errors.username}
                        helperText={
                            errors.username
                                ? errors.username.message
                                : 'Username is required'
                        }
                        {...register('username', { required: true })}
                    />
                    <CustomTextField
                        id='password'
                        label='Password'
                        variant='outlined'
                        type='password'
                        error={!!errors.password}
                        helperText={
                            errors.password
                                ? errors.password.message
                                : 'Password is required'
                        }
                        {...register('password', { required: true })}
                    />
                </Stack>
                <LinkMui
                    component={Link}
                    href={routers.challenge}
                    fontWeight={400}
                    fontSize={14}
                >
                    Forgeot Password ?
                </LinkMui>
                {isError && (
                    <Typography variant='body2' color='error'>
                        Incorrect username or password.
                    </Typography>
                )}
                <Button disabled={isPending} variant='contained' type='submit'>
                    Continue
                </Button>
            </Stack>
            <ResponsiveDialog handleClose={handleClose} open={open} />
        </>
    )
}
