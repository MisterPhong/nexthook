'use client'

import { Stack, Button, IconButton } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomTextField from '../share/CustomTextField'
import { useSignup } from '@/app/common/hooks/useSignup'
import { Signup, SignupSchema } from '@/app/common/types/auth.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoEye, IoEyeOffOutline } from 'react-icons/io5'
import PasswordStrengthBar from 'react-password-strength-bar'
import ResponsiveDialog from '../modules/ResponsiveDialog'

type Props = {}

export default function SignupForm({}: Props) {
    const [open, setOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [password, setPassword] = useState('')
    const { mutate, error, isPending } = useSignup()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Signup>({
        resolver: zodResolver(SignupSchema),
    })
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => event.preventDefault()

    return (
        <Fragment>
            <Stack
                spacing={2}
                component={'form'}
                onSubmit={handleSubmit((data) => {
                    mutate(data, {
                        onSuccess: () => {
                            handleOpen()
                        },
                    })
                })}
            >
                <CustomTextField
                    id='email'
                    label='Email'
                    variant='outlined'
                    error={
                        !!errors.email ||
                        error?.message === 'Email already exists.'
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
                    type={showPassword ? 'text' : 'password'}
                    error={!!errors.password}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? (
                                    <IoEyeOffOutline size={20} />
                                ) : (
                                    <IoEye size={20} />
                                )}
                            </IconButton>
                        ),
                    }}
                    helperText={
                        errors.password
                            ? errors.password.message
                            : 'Password is required'
                    }
                    {...register('password', {
                        required: true,
                        onChange: (e) => {
                            setPassword(e.target.value)
                        },
                    })}
                    onFocus={() => setIsPasswordFocused(true)} // Set focus to true
                    onBlur={() => setIsPasswordFocused(false)} // Set focus to false when losing focus
                />
                {isPasswordFocused && (
                    <PasswordStrengthBar
                        password={password}
                        shortScoreWord=''
                        scoreWords={[
                            'Very weak',
                            'Weak',
                            'Fair',
                            'Good',
                            'Strong',
                        ]}
                    />
                )}
                <Button disabled={isPending} variant='contained' type='submit'>
                    Sign Up
                </Button>
            </Stack>
            <ResponsiveDialog handleClose={handleClose} open={open} />
        </Fragment>
    )
}
