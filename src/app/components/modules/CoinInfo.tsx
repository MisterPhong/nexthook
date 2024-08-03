'use client'

import { symbol } from '@/app/common/constant/symbols'
import { useCoins } from '@/app/common/hooks/useCoins'
import { Box, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'

type Props = {}

export function CoinInfo({}: Props) {
    return (
        <Box>
            {symbol.map((item) => (
                <Box key={item.symbol} className='grid grid-cols-5 w-full'>
                    <Stack
                        spacing={0.5}
                        direction={'row'}
                        className='items-center'
                    >
                        {item.icon}
                        <Typography
                            fontWeight={600}
                            className='flex items-center'
                        >
                            {item.nameShort}
                        </Typography>
                        <Typography
                            fontWeight={400}
                            className='flex'
                            variant='caption'
                        >
                            {item.nameLong}
                        </Typography>
                    </Stack>
                    <Typography fontWeight={500} className='5' variant='body1'>
                        15/07/2024{' '}
                    </Typography>
                    <CoinPrice symbol={item.symbol} />
                    <Typography
                        fontWeight={500}
                        className='mt-5'
                        variant='body1'
                    >
                        65,000
                    </Typography>
                    <button>open</button>
                </Box>
            ))}
        </Box>
    )
}

export function CoinPrice({ symbol }: { symbol: string }) {
    const { data, isLoading } = useCoins(symbol)

    return (
        <Box className={`${!isLoading ? 'mt-2' : 'mt-[-2px]'}`}>
            {isLoading ? (
                <Skeleton
                    className='mt-2'
                    animation='wave'
                    height={50}
                    width={120}
                />
            ) : (
                <>
                    <Prices c={data?.c!} p={+data?.p!} />
                    <Percentage p={+data?.P!} />
                </>
            )}
        </Box>
    )
}

export function Prices({ c, p }: { c: string; p: number }) {
    return (
        <Typography
            fontWeight={600}
            variant='body1'
            className={`${Number(p) > 0 ? 'text-LONG' : 'text-SHORT'}`}
        >
            $
            {c.indexOf('.') !== -1 && Number(c.indexOf('.')) >= 4
                ? Number(c).toFixed(2)
                : Number(c.indexOf('.')) >= 3
                ? Number(c).toFixed(3)
                : Number(c.indexOf('.')) >= 2
                ? Number(c).toFixed(4)
                : Number(c.indexOf('.')) >= 1 && Number(c).toFixed(5)}{' '}
            USDT
        </Typography>
    )
}

export function Percentage({ p }: { p: number }) {
    return (
        <Typography
            fontWeight={600}
            className={`${Number(p) > 0 ? 'text-LONG' : 'text-SHORT'}`}
        >
            {Number(p) > 0 ? `+${p}%` : `${p}%`}
        </Typography>
    )
}

export function PriceLaning({ symbol }: { symbol: string }) {
    const { data, isLoading } = useCoins(symbol)

    const formatPrice = (price: string) => {
        const priceNum = Number(price)
        if (price.indexOf('.') !== -1) {
            if (price.indexOf('.') >= 4 || price.indexOf('.') >= 2) {
                return priceNum.toFixed(2)
            } else if (price.indexOf('.') >= 1) {
                return priceNum.toFixed(4)
            }
        }
        return priceNum.toFixed(2)
    }

    return (
        <>
            {isLoading ? (
                <Skeleton
                    className='ml-5'
                    animation='wave'
                    height={45}
                    width={80}
                />
            ) : (
                <Typography
                    fontWeight={500}
                    className={`${
                        !isLoading && 'mt-[21px]'
                    } flex justify-end items-center ${
                        Number(data?.p) > 0 ? 'text-LONG' : 'text-SHORT'
                    }`}
                    variant='body1'
                >
                    ${formatPrice(data?.c!)}
                </Typography>
            )}
            {isLoading ? (
                <Skeleton
                    className='ml-5'
                    animation='wave'
                    height={45}
                    width={80}
                />
            ) : (
                <Typography
                    fontWeight={500}
                    className={`${
                        !isLoading && 'mt-[21px]'
                    } flex justify-end items-center ${
                        Number(data?.P) > 0 ? 'text-LONG' : 'text-SHORT'
                    }`}
                    variant='body1'
                >
                    {Number(data?.P) > 0
                        ? `+${Number(data?.P).toFixed(2)}%`
                        : `${Number(data?.P).toFixed(2)}%`}
                </Typography>
            )}
        </>
    )
}
