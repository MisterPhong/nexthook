import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

type Props = {}

export default function OrDivider({}: Props) {
    return (
        <Box className='flex items-center my-4'>
            <Divider className='flex-grow' />
            <Typography className='mx-2 text-sm text-gray-500'>OR</Typography>
            <Divider className='flex-grow' />
        </Box>
    )
}
