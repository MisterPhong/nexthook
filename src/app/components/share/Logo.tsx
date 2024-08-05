import { Box } from '@mui/material'
import Image from 'next/image'

type Props = {
    width?: number
    height?: number
    src?: string
    alt?: string
}

export default function Logo({
    width = 60,
    height = 60,
    src = '/logo/Logo.svg',
    alt = 'icon',
}: Props) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 2,
            }}
        >
            <Image alt={alt} src={src} width={width} height={height} />
        </Box>
    )
}
