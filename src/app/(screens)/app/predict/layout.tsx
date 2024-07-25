import { Box } from '@mui/material'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Prediction',
    description: 'Prediction page',
}

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Box>
            {children}
        </Box>
    )
}