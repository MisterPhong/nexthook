'use client'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { predictSelector } from '@/app/common/store/slices/predictSlice'
import CoinInfo from '@/app/_components/share/CoinInfo'

type Props = {}

export default function Page({ }: Props) {
    const predictReducer = useSelector(predictSelector)
    // console.log(predictReducer.load)

    return (

        <Box className="container mx-auto mt-3">
            <Box className="grid grid-cols-5 w-full">
                {["symbol", "Date", "Current", "Predict", "Open order"].map((item) => (
                    <Box
                        key={item}
                    // display="flex"
                    // justifyContent="center"
                    // alignItems="center"
                    // className="flex items-center w-full"
                    >
                        <Typography variant="h6">{item}</Typography>
                    </Box>
                ))}
            </Box>
           <CoinInfo/>
        </Box>
    )
}
