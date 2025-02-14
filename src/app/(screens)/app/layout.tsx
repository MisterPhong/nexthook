import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import type { Metadata } from 'next'
import AppBar from '@/app/components/modules/AppBar'

export const metadata: Metadata = {
    title: 'Zookeeper',
    description: 'Position page',
}

export default function layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Box>
            <CssBaseline />
            <AppBar />
            {children}
        </Box>
    )
}
