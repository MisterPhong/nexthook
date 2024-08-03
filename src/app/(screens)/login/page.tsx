import LoginForm from '@/app/components/form/LoginForm'
import {
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material'
import OrDivider from '@/app/components/modules/OrDivider'
import { SocialButton } from '@/app/components/share/SocialButton'
import { DontAccount } from '@/app/components/share/DontAccount'
import Logo from '@/app/components/share/Logo'

export default async function page() {
    return (
        <Stack
            spacing={3}
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Card className='w-96 p-5' elevation={3}>
                <CardContent>
                    <Stack className='mb-5'>
                        <Logo />
                        <Typography
                            variant='h5'
                            className='text-center'
                            fontWeight={500}
                        >
                            Sign In
                        </Typography>
                    </Stack>
                    <LoginForm />
                    <OrDivider />
                    <Stack spacing={1}>
                        <SocialButton
                            label='Continue with Google'
                            iconPath='/socialLogin/google.svg'
                        />
                    </Stack>
                </CardContent>
            </Card>
            <DontAccount />
        </Stack>
    )
}
