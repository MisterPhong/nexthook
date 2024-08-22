'use client'
import { Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { Link as LinkMui } from '@mui/material'
import { Login, LoginSchema } from '@/app/common/types/auth.type'
import { routers } from '@/app/common/constant/path'
import CustomTextField from '../share/CustomTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import ResponsiveDialog from '../modules/ResponsiveDialog'
import { loginAction } from '@/app/common/actions/login-action'
import {
    FieldErrors,
    FieldPath,
    useForm,
    UseFormRegister,
} from 'react-hook-form'
import { useFormState, useFormStatus } from 'react-dom'
import { ErrorMessage } from '@hookform/error-message'
import { State } from '@/app/common/types/state.type'
import { setEmail } from '@/app/common/store/slices/emailSlice'
import { useAppDispatch } from '@/app/common/store/store'

type Props = {}

export default function LoginForm({}: Props) {
    const [open, setOpen] = useState(false)
    const [pending, startTransaction] = useTransition()
    const dispatch = useAppDispatch()
    const [state, formAction] = useFormState<State, Login>(loginAction, null)
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Login>({
        resolver: zodResolver(LoginSchema),
    })

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    useEffect(() => {
        if (!state) {
            return
        }
        // In case our form action returns `error` we can now `setError`s
        if (state.status === 'error') {
            state.errors?.map((error) => {
                setError(error.path as FieldPath<Login>, {
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
    register: UseFormRegister<Login>
    errors: FieldErrors<Login>
    state: State
}) {
    const { pending } = useFormStatus()

    return (
        <>
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
                <ErrorMessage name='username' errors={errors} />

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
                <ErrorMessage name='password' errors={errors} />
            </Stack>
            <LinkMui
                component={Link}
                href={routers.challenge}
                fontWeight={400}
                fontSize={14}
            >
                Forgeot Password ?
            </LinkMui>
            {state?.status === 'error' && (
                <Typography variant='body2' color='error'>
                    {state.message}
                </Typography>
            )}
            <Button disabled={pending} variant='contained' type='submit'>
                Continue
            </Button>
        </>
    )
}
