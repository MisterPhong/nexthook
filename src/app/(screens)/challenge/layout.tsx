import { Box, CssBaseline } from '@mui/material'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'sign in bot',
}

export default function layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Box className='w-screen h-screen flex justify-center items-center'>
            <CssBaseline />
            {children}
        </Box>
    )
}
