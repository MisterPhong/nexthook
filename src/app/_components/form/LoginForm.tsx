import { Stack, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material'
import { register } from 'module'
import React from 'react'
import theme from '../theme/theme'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

type Props = {}

export default function LoginForm({ }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const action: () => void = handleSubmit(async (data) => {
        // const response = await handleSignin(data)
        // setStatus(response.statusCode)
        // redirect('/signin/otp')
    })

    return (
        <Stack
            spacing={3}
            component={'form'}
            // onSubmit={handleSubmit(onSubmit)}
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
            {loginError && (
                <Typography variant="body2" color="error">
                    Incorrect username or password.
                </Typography>
            )}
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />

            <Button
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