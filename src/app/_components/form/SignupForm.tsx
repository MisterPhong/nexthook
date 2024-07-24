'use client'

import {
    Stack,
    Typography,
    TextField,
    Button,
    Box
} from '@mui/material'
import React from 'react'
import theme from '../theme/theme'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import CustomTextField from '../share/CustomTextField'
import { useSignup } from '@/app/common/hooks/useSignup'
import { Signup, SignupSchema } from '@/app/common/types/auth.type'
import { zodResolver } from '@hookform/resolvers/zod'
import AlertLabel from '../share/AlertLabel'
import { useRouter } from 'next/navigation'
import { routers } from '@/app/common/constant/path'

type Props = {}

// Initial Values
const initialValue: Signup = {
    username: 'test123',
    password: 'test123',
    email: 'test@gmail.com'
}

export default function SignupForm({ }: Props) {
    const router = useRouter()
    const {
        mutate,
        isError,
        error
    } = useSignup()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Signup>({
        defaultValues: initialValue,
        resolver: zodResolver(SignupSchema)
    })

    return (
        <Stack
            spacing={3}
            component={'form'}
            onSubmit={handleSubmit((data) => {
                mutate({
                    username: data.username,
                    password: data.password,
                    email: data.email
                }, {
                    onSuccess: () => {
                        router.push(routers.otp)
                    }
                })
            })}
        >
            <Typography variant='h3' className='text-center'>Sign Up</Typography>
            <CustomTextField
                id='username'
                label='Username'
                variant='outlined'
                type='text'
                error={errors.username && true}
                helperText={errors.username ? errors.username.message : 'Username is required'}
                {...register('username', { required: true })}
            />

            <CustomTextField
                id='password'
                label='Password'
                variant='outlined'
                error={errors.password && true}
                // type='password'
                helperText={errors.password ? errors.password.message : 'Password is required'}
                {...register('password', { required: true })}
            />

            <Stack spacing={isError ? 1 : 3} >
                <CustomTextField
                    id='email'
                    label='Email'
                    variant='outlined'
                    error={errors.email && true}
                    helperText={errors.email ? errors.email.message : 'Email is required'}
                    {...register('email', { required: true })}
                />
                {isError && <AlertLabel message={error?.message} />}
                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        borderRadius: '10px',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                    size='small'
                    type='submit'
                >
                    Sign Up
                </Button>
            </Stack>
            <Link href='/login'>You Have a Account? Login Now</Link>
        </Stack>
    )
}