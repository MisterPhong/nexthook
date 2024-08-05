import { routers } from '@/app/common/constant/path'
import ForgotForm from '@/app/components/form/ForgotForm'
import { DontAccount } from '@/app/components/share/DontAccount'
import {
    Card,
    CardContent,
    Stack,
    Typography,
    Link as LinkMui,
    Box,
} from '@mui/material'
import Link from 'next/link'
import React from 'react'
import Logo from '@/app/components/share/Logo'

type Props = {}

export default function page({}: Props) {
    return (
        <Stack
            spacing={3}
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Card className='w-96 px-5'>
                <CardContent>
                    <Logo
                        alt='forgot-icon'
                        src='/images/forgot.svg'
                        width={140}
                        height={140}
                    />
                    <Typography variant='h6' align='center' gutterBottom>
                        Forgot Your Password
                    </Typography>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        align='center'
                        paragraph
                    >
                        Enter your email address and we will send you
                        instructions to reset your password.
                    </Typography>
                    <ForgotForm />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 2,
                        }}
                    >
                        <LinkMui
                            component={Link}
                            href={routers.login}
                            fontWeight={600}
                            fontSize={14}
                            sx={{
                                align: 'center',
                            }}
                        >
                            Back to Login
                        </LinkMui>
                    </Box>
                </CardContent>
            </Card>
            <DontAccount />
        </Stack>
    )
}
