'use client'
import { symbol } from '@/app/common/constant/symbols'
import { useCoins } from '@/app/common/hooks/useCoins'
import { predictSelector } from '@/app/common/store/slices/predictSlice'
import { Box, Skeleton, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {
}

export default function CoinInfo({ }: Props) {
    return (
        <Box>
            {symbol.map((item) => (
                <Box key={item.symbol} className='grid grid-cols-5 w-full'>
                    {item.icon}
                    <Typography className="mt-5" variant="body1">15/07/2024 </Typography>
                    <CoinPrice
                        symbol={item.symbol}
                    />
                    <Typography  className="mt-5" variant="body1">65,000</Typography>
                    <button>
                        open
                    </button>
                </Box>
            ))}
        </Box>
    )
}

function CoinPrice({ symbol }: { symbol: string }) {
    const { data, load } = useCoins(symbol)

    return (
        <Box className={`${!load ? "mt-5":"mt-[-1px]"}`}>
            {load ? (
                <Skeleton animation="wave" height={50} width={120}/>
            ) : (
                <Typography variant="body1">
                    {(data?.k.c.indexOf('.') !== -1) &&
                        (Number(data?.k.c.indexOf('.')) >= 4) ?
                        Number(data?.k.c).toFixed(2)
                        : (Number(data?.k.c.indexOf('.')) >= 3) ?
                            Number(data?.k.c).toFixed(3)
                            : (Number(data?.k.c.indexOf('.')) >= 2) ?
                                Number(data?.k.c).toFixed(4)
                                : (Number(data?.k.c.indexOf('.')) >= 1) &&
                                Number(data?.k.c).toFixed(5)
                    } USDT
                </Typography>
            )}
        </Box>
    )
}