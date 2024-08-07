import { Box } from '@mui/material'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'reset-password',
    description: 'reset-password',
}

export default function layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Box className='w-screen h-screen flex justify-center items-center'>
            {children}
        </Box>
    )
}
