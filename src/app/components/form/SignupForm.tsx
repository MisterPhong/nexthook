'use client'

import { Stack, Button } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
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
    username: 'test123A',
    email: 'thebrook789@gmail.com',
    password: 'test123@A',
    confirmPassword: 'test123@A',
}

export default function SignupForm({}: Props) {
    const router = useRouter()
    const { mutate, isError, error, isLoading } = useSignup()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Signup>({
        // defaultValues: initialValue,
        resolver: zodResolver(SignupSchema),
    })

    return (
        <Stack
            spacing={2}
            component={'form'}
            onSubmit={handleSubmit((data) => {
                mutate(
                    {
                        username: data.username,
                        password: data.password,
                        email: data.email,
                        confirmPassword: data.confirmPassword,
                    },
                    {
                        onSuccess: () => {
                            router.push(routers.otp)
                        },
                    },
                )
            })}
        >
            <CustomTextField
                id='email'
                label='Email'
                variant='outlined'
                error={
                    !!errors.email || error?.message === 'Email already exists.'
                }
                helperText={
                    errors.email
                        ? 'Email is required'
                        : error?.message === 'Email already exists.'
                        ? 'Email is already in use. Please choose a different one.'
                        : 'Email is required'
                }
                {...register('email', { required: true })}
            />
            <CustomTextField
                id='username'
                label='Username'
                variant='outlined'
                type='text'
                error={
                    error?.message === 'User already exists.' ||
                    !!errors.username
                }
                helperText={
                    errors.username
                        ? 'User is required'
                        : error?.message === 'User already exists.'
                        ? 'Username is already taken. Please choose a different one.'
                        : 'User is required'
                }
                {...register('username', { required: true })}
            />
            <CustomTextField
                id='password'
                label='Password'
                variant='outlined'
                type='password'
                error={errors.password && true}
                helperText={
                    errors.password
                        ? errors.password.message
                        : 'Password is required'
                }
                {...register('password', { required: true })}
            />
            <CustomTextField
                id='confirmPassword'
                label='Confirm password'
                variant='outlined'
                type='password'
                error={errors.confirmPassword && true}
                helperText={
                    errors.confirmPassword
                        ? errors.confirmPassword.message
                        : 'Confirm password is required'
                }
                {...register('confirmPassword', { required: true })}
            />
            <Button disabled={isLoading} variant='contained' type='submit'>
                Sign Up
            </Button>
        </Stack>
    )
}
