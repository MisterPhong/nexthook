'use client'

import { Forgot, ForgotSchema } from '@/app/common/types/forgot.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import CustomTextField from '../share/CustomTextField'
import { useRouter } from 'next/navigation'
import { routers } from '@/app/common/constant/path'
import { useChallenge } from '@/app/common/hooks/useChallenge'
import { useAppDispatch } from '@/app/common/store/store'
import { setForgotEmail } from '@/app/common/store/slices/forgotSlice'

type Props = {}

export default function ForgotForm({}: Props) {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Forgot>({
        resolver: zodResolver(ForgotSchema),
    })
    const { mutate, error, isPending } = useChallenge()
    const dispatch = useAppDispatch()

    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                mutate(data, {
                    onSuccess: () => {
                        router.push(routers.resetPassword)
                        dispatch(setForgotEmail(data.email))
                    },
                })
            })}
        >
            <Box sx={{ mb: 2 }}>
                <CustomTextField
                    id='email'
                    label='Email'
                    variant='outlined'
                    error={!!errors.email || error?.statusCode === 404}
                    helperText={
                        errors.email
                            ? errors.email.message
                            : error?.statusCode === 404
                            ? 'This email address could not be located'
                            : 'Email is required'
                    }
                    {...register('email', { required: true })}
                    margin='normal'
                    fullWidth
                />
            </Box>
            <Button
                fullWidth
                variant='contained'
                color='primary'
                type='submit'
                disabled={isPending}
            >
                Continue
            </Button>
        </form>
    )
}
