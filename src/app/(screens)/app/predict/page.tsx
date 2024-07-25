import {
    Box,
    Card,
    CardContent,
    Typography
} from '@mui/material'
import React from 'react'
import CoinInfo from '@/app/_components/modules/CoinInfo'

type Props = {}

export default function Page({ }: Props) {

    return (
        <Card>
            <CardContent>
                <Box className="grid grid-cols-5 w-full">
                    {["symbol", "Date", "Current", "Predict", "Open order"].map((item) => (
                        <Box
                            key={item}
                        >
                            <Typography variant="h6">{item}</Typography>
                        </Box>
                    ))}
                </Box>
                <CoinInfo />
            </CardContent>
        </Card>
    )
}
