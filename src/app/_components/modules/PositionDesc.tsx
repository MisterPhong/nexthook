import { Box, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

type Props = {}

export default function PositionDesc({ }: Props) {
    return (
        <Box
            sx={{ borderBottom: 1, borderColor: 'divider' }}
            className='w-full h-16 grid grid-cols-8 items-center'
        >
            <Box className="flex items-center">
                <Box className={`${'SHORT' === 'SHORT' ? 'bg-SHORT' : 'bg-LONG'}  w-1.5 h-16 mr-2`} />
                <Symbols symbol={'BTC/USDT'} leverage={'15'} />
            </Box>

            <Box className="flex justify-center">
                {123123.123123.toFixed(2)}
            </Box>

            <Box className="flex justify-center">
                {(+123.12312).toFixed(2)} USDT
            </Box>

            <Box className="flex flex-col justify-center mx-auto">
                <Typography className={`${+123123 >= 0 ? 'text-LONG' : 'text-SHORT'}`}>
                    {(+123123).toFixed(2)} USDT
                </Typography>
                <Typography className={`mx-auto ${+123123 >= 0 ? 'text-LONG' : 'text-SHORT'}`}>
                    ({123123})
                </Typography>
            </Box>
            <Box className="flex justify-center">
                {'5m'}
            </Box>
            <Box className="flex justify-center">
                {'22/04/2024'}
            </Box>
            <Box className="flex justify-center">
                {`EMA/15`}
            </Box>
            <Box className="flex justify-center text-lg">
                <Box className="h-8 w-8 rounded-full flex items-center justify-center bg-Primary text-Modal hover:bg-Secondary hover:text-DarkPrimary duration-300 ">
                    <DeleteIcon />
                </Box>
            </Box>
        </Box>
    )
}

function Symbols({ symbol, leverage }: { symbol: string, leverage: string }) {
    return (
        <Box>
            <Typography
                className="text-base"
            >
                {symbol}
            </Typography>
            <Box
                className="bg-Yellow w-fit px-0.5 rounded-sm"
            >
                {leverage}x
            </Box>
        </Box>
    )
}