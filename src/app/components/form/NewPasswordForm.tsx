'use client'

import { Stack, Button, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomTextField from '../share/CustomTextField'
import {
    NewPassword,
    NewPasswordSchema,
    Signup,
    SignupSchema,
} from '@/app/common/types/auth.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { routers } from '@/app/common/constant/path'
import { IoEye, IoEyeOffOutline } from 'react-icons/io5'
import PasswordStrengthBar from 'react-password-strength-bar'
import { useResetPass } from '@/app/common/hooks/useResetPass'

type Props = {
    token:string
}

export default function NewPasswordForm({token}:Props) {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    // const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [password, setPassword] = useState('')
    const { mutate, isPending } = useResetPass()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewPassword>({
        resolver: zodResolver(NewPasswordSchema),
    })

    const handleClickShowPassword = () => setShowPassword((prev) => !prev)

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()
    }

    return (
        <Stack
            spacing={2}
            component={'form'}
            onSubmit={handleSubmit((data) => {
                mutate(
                    {
                        token,
                        password: data.password,
                    },
                    {
                        onSuccess: () => router.push(routers.login),
                    },
                )
            })}
        >
            <CustomTextField
                id='new-password'
                label='Password'
                variant='outlined'
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                helperText={
                    errors.password
                        ? errors.password.message
                        : 'Password is required'
                }
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
                {...register('password', {
                    required: true,
                    onChange: (e) => setPassword(e.target.value),
                })}
            />
            <CustomTextField
                id='new-confirm-password'
                label='Confirm Password'
                variant='outlined'
                type={showPassword ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                helperText={
                    errors.confirmPassword
                        ? errors.confirmPassword.message
                        : 'Please confirm your password'
                }
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
                {...register('confirmPassword', { required: true })}
            />
            <PasswordStrengthBar
                password={password}
                shortScoreWord=''
                scoreWords={['Very weak', 'Weak', 'Fair', 'Good', 'Strong']}
            />
            <Button disabled={isPending} variant='contained' type='submit'>
                Continue
            </Button>
        </Stack>
    )
}
