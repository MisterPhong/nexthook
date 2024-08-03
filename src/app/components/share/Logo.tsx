import { Box } from '@mui/material'
import Image from 'next/image'

type Props = {
    width?: number
    height?: number
}

export default function Logo({ width = 80, height = 80 }: Props) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 2,
            }}
        >
            <Image
                alt='email-icon'
                src='/logo/logo.svg'
                width={width}
                height={height}
            />
        </Box>
    )
}
