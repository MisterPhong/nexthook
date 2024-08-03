import { routers } from '@/app/common/constant/path'
import SignupForm from '@/app/components/form/SignupForm'
import OrDivider from '@/app/components/modules/OrDivider'
import { SocialButton } from '@/app/components/share/SocialButton'
import { Stack, Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import Logo from '@/app/components/share/Logo'

export default function page() {
    return (
        <Box className='w-full'>
            <Stack className='max-w-md mx-auto' spacing={2}>
            <Logo />
                <Typography
                    variant='h5'
                    className='text-center'
                    fontWeight={500}
                >
                    Create your account
                </Typography>
                <SignupForm />
                <OrDivider />
                <Stack spacing={1}>
                    <SocialButton
                        label='Continue with Google'
                        iconPath='/socialLogin/google.svg'
                    />
                </Stack>
                <Button
                    LinkComponent={Link}
                    href={routers.login}
                    variant='text'
                >
                    Alerady have an account? Sign in
                </Button>
            </Stack>
        </Box>
    )
}
