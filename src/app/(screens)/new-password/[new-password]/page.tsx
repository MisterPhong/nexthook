import { routers } from '@/app/common/constant/path';
import ResetPasswordForm from '@/app/components/form/ResetPasswordForm';
import OrDivider from '@/app/components/modules/OrDivider';
import Logo from '@/app/components/share/Logo';
import { SocialButton } from '@/app/components/share/SocialButton';
import { Box, Stack, Typography, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react'

type Params = {
    "new-password": string;
  };
  
  type Props = {
    params: Params;
  };
  

export default function page({params}: Props) {

    return (
        <Box className='w-full'>
            <Stack className='max-w-md mx-auto' spacing={2}>
                <Logo alt='logo' />
                <Typography
                    variant='h6'
                    fontWeight={500}
                    fontSize={19}
                    align='center'
                >
                    Change Your Password
                </Typography>
                <Typography align='center' paragraph>
                Enter a new password below to change your password.
                </Typography>
                <ResetPasswordForm  token={params['new-password']}/>
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