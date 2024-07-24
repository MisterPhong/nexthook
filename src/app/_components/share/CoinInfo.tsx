'use client'

import { symbol } from '@/app/common/constant/symbols'
import { useCoins } from '@/app/common/hooks/useCoins'
import { setStatus } from '@/app/common/store/slices/authSlice'
import { useAppDispatch } from '@/app/common/store/store'
import { Box, Skeleton, Typography } from '@mui/material'
import React, { useEffect } from 'react'

type Props = {
    accessToken: string | undefined
}

export default function CoinInfo({ accessToken }: Props) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setStatus(accessToken ? true : false))
    }, [accessToken])

    return (
        <Box>
            {symbol.map((item) => (
                <Box key={item.symbol} className='grid grid-cols-5 w-full'>
                    {item.icon}
                    <Typography className="mt-5" variant="body1">15/07/2024 </Typography>
                    <CoinPrice
                        symbol={item.symbol}
                    />
                    <Typography className="mt-5" variant="body1">65,000</Typography>
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
        <Box className={`${!load ? "mt-5" : "mt-[-1px]"}`}>
            {load ? (
                <Skeleton animation="wave" height={50} width={120} />
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