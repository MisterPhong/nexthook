import { Box } from '@mui/material'
import React from 'react'
import type { Metadata } from 'next'

type Props = {}

export const metadata: Metadata = {
    title: 'Position',
    description: 'Position page',
}

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Box>
            {children}
        </Box>
    )
}