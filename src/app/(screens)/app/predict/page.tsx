import { Box, Typography } from '@mui/material'
import React from 'react'
import CoinInfo from '@/app/_components/share/CoinInfo'
import { cookieKey } from '@/app/common/constant/cookie'
import { cookies } from 'next/headers'

type Props = {}

export default function Page({ }: Props) {
    const cookieStore = cookies()

    return (
        <Box className="container mx-auto mt-3">
            <Box className="grid grid-cols-5 w-full">
                {["symbol", "Date", "Current", "Predict", "Open order"].map((item) => (
                    <Box
                        key={item}
                    >
                        <Typography variant="h6">{item}</Typography>
                    </Box>
                ))}
            </Box>
            <CoinInfo accessToken={cookieStore.get(cookieKey.accessToken)?.value} />
        </Box>
    )
}
