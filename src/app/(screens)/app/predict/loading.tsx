'use client'

import { Box, CssBaseline } from '@mui/material'

export default function Loading() {
    return (
        <Box
            className='flex justify-center items-center'
            style={{ height: `calc(100vh - 68.5px)` }}
        >
            <CssBaseline />
            <div className='spinner'></div>
        </Box>
    )
}
