import { Box } from '@mui/material'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'sign in bot',
}

export default function layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.paper',
            }}
        >
            {children}
        </Box>
    )
}
