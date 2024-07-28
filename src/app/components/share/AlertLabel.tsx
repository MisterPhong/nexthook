import { Box, Typography } from '@mui/material'

type Props = {
    message: string
}

export default function AlertLabel({ message }: Props) {
    return (
        <Box className="text-red-700 rounded w-full" role="alert">
            <Typography variant='body2' component='p'>{message}</Typography>
        </Box>
    )
}