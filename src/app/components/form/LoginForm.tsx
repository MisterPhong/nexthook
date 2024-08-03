'use client'
import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import { Link as LinkMui } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useLogin } from '@/app/common/hooks/useLogin'
import { Login, LoginSchema } from '@/app/common/types/auth.type'
import { useRouter } from 'next/navigation'
import { routers } from '@/app/common/constant/path'
import CustomTextField from '../share/CustomTextField'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {}

export default function LoginForm({}: Props) {
    const router = useRouter()
    const { mutate, isLoading, isError } = useLogin()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Login>({
        resolver: zodResolver(LoginSchema),
    })

    return (
        <Stack
            spacing={2}
            component={'form'}
            onSubmit={handleSubmit((data) => {
                mutate(data, {
                    onSuccess: () => {
                        router.push(routers.otp)
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
            <Button disabled={isLoading} variant='contained' type='submit'>
                Continue
            </Button>
        </Stack>
    )
}
