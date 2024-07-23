'use client'

import {
    Stack,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button
} from '@mui/material'
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Login } from '@/app/common/types/login.type'
import theme from '../theme/theme'
import { useRouter } from 'next/navigation'
import { useLogin } from '@/app/common/hooks/useLogin'

type Props = {}

export default function LoginForm({ }: Props) {
    const { mutate, isLoading, isSuccess, isError, error } = useLogin()

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
                mutate(data, {
                    onSuccess: () => {
                        // router.push('/otp')
                    }
                })
            })}
        >
            <Typography variant='h3' className='text-center'>LOGIN</Typography>
            <TextField
                id='text1'
                label='Username'
                variant='outlined'
                error={isError}
                helperText={errors.username && 'Username is required' }
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: '10px 10px 10px 10px',
                    },
                }}
                {...register('username', { required: true })}
            />
            <TextField
                id='text2'
                label='Password'
                variant='outlined'
                error={isError}
                helperText={errors.password && 'Password is required'}
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: '10px 10px 10px 10px',
                    },
                }}
                {...register('password', { required: true })}
            />
            {isError && (
                <Typography variant='body2' color='error'>
                    Incorrect username or password.
                </Typography>
            )}
            <FormControlLabel control={<Checkbox defaultChecked />} label='Remember me' />

            <Button
                disabled={isLoading}
                variant='contained'
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderRadius: '10px',
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }}
                type='submit'
            >
                LOGIN
            </Button>

            <Link href='/signUp'>Create Account</Link>
        </Stack>
    )
}