'use client'
import { Stack, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Login } from '@/app/common/types/login.type'
import theme from '../theme/theme'
import { redirect, useRouter } from "next/navigation"
import { server } from '@/app/common/constant/server'
import { Email } from '@/app/common/types/auth.type'
import { useMutation } from 'react-query'
import { ErrorResponse } from 'react-router-dom'
import { httpClient } from '../services/httpClient'
import { useAppDispatch } from '@/app/common/store/store'
import { setEmail } from '@/app/common/store/slices/emailSlice'

type Props = {}

async function login(username: string, password: string): Promise<Email> {
    const response = await httpClient.post(server.login, { username, password })
    return response.data
}

export default function LoginForm({ }: Props) {
    const router = useRouter()
    const dipatch = useAppDispatch()
    const { mutate, isLoading, isSuccess, error } = useMutation<Email, ErrorResponse, Login>(
        async ({ username, password }) => await login(username, password),
 {
        onError: (error) => {
            console.error("Error occurred:", error)
        },
        onSuccess: (data) => {
            console.log("Login Success:", data.email)
            dipatch(setEmail(data.email))
            router.push('/otp')
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Login>({
        defaultValues: {
            username: 'user1211',
            password: 'test1234'
        }
    })

    return (
        <Stack
            spacing={3}
            component={'form'}
            onSubmit={handleSubmit((data) => {
                mutate(data)
                if (isSuccess) {
                    redirect('/otp')
                }
            })}
        >
            <Typography variant="h3" className="text-center">LOGIN</Typography>
            <TextField
                id="text1"
                label="Username"
                variant="outlined"
                error={errors.username ? true : false} // Check if username has error
                helperText={errors.username ? "Username is required" : ""}
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: '10px 10px 10px 10px',
                    },
                }}
                {...register('username', { required: true })}
            />
            <TextField
                id="text2"
                label="Password"
                variant="outlined"
                error={errors.password ? true : false} // Check if password has error
                helperText={errors.password ? "Password is required" : ""}
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: '10px 10px 10px 10px',
                    },
                }}
                {...register('password', { required: true })}
            />
            {/* {loginError && (
                <Typography variant="body2" color="error">
                    Incorrect username or password.
                </Typography>
            )} */}
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />

            <Button
                disabled={isLoading}
                variant="contained"
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderRadius: '10px',
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }}
                type="submit"
            >
                LOGIN
            </Button>

            <Link href="/signUp">Create Account</Link>
        </Stack>
    )
}