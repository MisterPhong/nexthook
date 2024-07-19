'use client'
import { Stack, Typography, TextField, FormControlLabel, Checkbox } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { handleSignin } from '@/app/_actions/login-action'
import { Login } from '@/app/common/types/login.type'
import { redirect } from 'next/navigation'
import { CustomButton } from '../share/CustomButton'
import { useAppDispatch } from '@/app/common/store/store'
import { setEmail } from '@/app/common/store/slices/emailSlice'

type Props = {}

export default function LoginForm({ }: Props) {
    const dispatch = useAppDispatch()
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

    const action: () => void = handleSubmit(async (data: Login) => {
        const { email } = await handleSignin({
            username: data.username,
            password: data.password,
        })
        if (email) {
            console.log(email)
            dispatch(setEmail(email))
            redirect('/otp')
        }
    })

    return (
        <Stack
            spacing={3}
            component={'form'}
            action={action}
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

            {/* <Button
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
            </Button> */}
            <CustomButton label='Login' />

            <Link href="/signUp">Create Account</Link>
        </Stack>
    )
}