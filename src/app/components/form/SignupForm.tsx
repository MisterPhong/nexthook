'use client'

import { Stack, Button, IconButton } from '@mui/material'
import React, { useEffect, useState, useTransition } from 'react'
import {
    FieldErrors,
    FieldPath,
    useForm,
    UseFormRegister,
} from 'react-hook-form'
import CustomTextField from '../share/CustomTextField'
import { useSignup } from '@/app/common/hooks/useSignup'
import {
    Email,
    Login,
    Signup,
    SignupSchema,
} from '@/app/common/types/auth.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoEye, IoEyeOffOutline } from 'react-icons/io5'
import PasswordStrengthBar from 'react-password-strength-bar'
import ResponsiveDialog from '../modules/ResponsiveDialog'
import { useFormState, useFormStatus } from 'react-dom'
import { State } from '@/app/common/types/state.type'
import { signupAction } from '@/app/common/actions/signup-action'
import { useAppDispatch } from '@/app/common/store/store'
import { setEmail } from '@/app/common/store/slices/emailSlice'
import { httpClient } from '@/app/common/services/httpClient'
import { server } from '@/app/common/constant/server'

type Props = {}

export default function SignupForm({}: Props) {
    const [open, setOpen] = useState(false)
    const { mutate, error, isPending } = useSignup()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Signup>({
        resolver: zodResolver(SignupSchema),
    })
    const dispatch = useAppDispatch()
    const [pending, startTransaction] = useTransition()
    const [state, formAction] = useFormState<State, Signup>(signupAction, null)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    useEffect(() => {
        if (!state) {
            return
        }
        // In case our form action returns `error` we can now `setError`s
        if (state.status === 'error') {
            state.errors?.map((error) => {
                setError(error.path as FieldPath<Signup>, {
                    message: error.message,
                })
            })
        }
        if (state.status === 'success') {
            dispatch(setEmail(state.message))
            handleOpen()
        }
    }, [state, setError])

    return (
        <>
            <Stack
                spacing={2}
                component={'form'}
                onSubmit={handleSubmit((data) => {
                    startTransaction(() => formAction(data))
                })}
            >
                <Form register={register} errors={errors} state={state} />
            </Stack>
            <ResponsiveDialog handleClose={handleClose} open={open} />
        </>
    )
}

function Form({
    register,
    errors,
    state,
}: {
    register: UseFormRegister<Signup>
    errors: FieldErrors<Signup>
    state: State
}) {
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const { pending } = useFormStatus()

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()
    }

    return (
        <>
            <CustomTextField
                id='email'
                label='Email'
                variant='outlined'
                error={
                    !!errors.email || state?.message === 'Email already exists.'
                }
                helperText={
                    errors.email
                        ? 'Email is required'
                        : state?.message === 'Email already exists.'
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
                    state?.message === 'User already exists.' ||
                    !!errors.username
                }
                helperText={
                    errors.username
                        ? 'User is required'
                        : state?.message === 'User already exists.'
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
                    scoreWords={['Very weak', 'Weak', 'Fair', 'Good', 'Strong']}
                />
            )}
            <Button disabled={pending} variant='contained' type='submit'>
                Sign Up
            </Button>
        </>
    )
}
