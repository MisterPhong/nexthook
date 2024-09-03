import { routers } from '@/app/common/constant/path'
import SignupForm from '@/app/components/form/SignupForm'
import OrDivider from '@/app/components/modules/OrDivider'
import { SocialButton } from '@/app/components/share/SocialButton'
import { Stack, Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import Logo from '@/app/components/share/Logo'

export default function page() {
    return (
        <Box 
        sx={{
            width: '100%'
        }}
        >
            <Stack 
            sx={{
                maxWidth: 500,
                mx:{
                    xs: 5,
                    sm: 'auto'
                },
            }}
            spacing={2}
            >
                <Logo alt='logo' />
                <Typography
                    variant='h6'
                    fontWeight={500}
                    fontSize={19}
                    align='center'
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
