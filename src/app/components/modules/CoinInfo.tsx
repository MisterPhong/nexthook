'use client'

import Link from 'next/link'
import { routers } from '@/app/common/constant/path'
import { symbol } from '@/app/common/constant/symbols'
import { useRealCoin } from '@/app/common/hooks/useRealCoin'
import { profileSelector } from '@/app/common/store/slices/profileSlice'
import { Box, Stack, Typography, Button, Skeleton } from '@mui/material'
import { Fragment, useMemo } from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { Predict } from '@/app/common/types/predict.type'

type Props = {
    data: Predict
}

export function CoinInfo({ data }: Props) {
    const profileReducer = useSelector(profileSelector)

    return (
        <Box>
            {symbol.map((item) => (
                <Box key={item.symbol}>
                    <Box
                        sx={{
                            height: 'max-content',
                        }}
                        className={`grid grid-cols-5`}
                    >
                        <Stack
                            spacing={0.8}
                            direction={'row'}
                            alignItems='center'
                        >
                            {item.icon}
                            <Typography
                                fontWeight={600}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.nameShort}
                            </Typography>
                            <Typography fontWeight={400} variant='caption'>
                                {item.nameLong}
                            </Typography>
                        </Stack>

                        <Typography
                            fontWeight={500}
                            variant='body1'
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'start',
                            }}
                        >
                            {dayjs(data.date).format('DD/MM/YYYY')}
                        </Typography>

                        <Box className='col-span-2'>
                            <CoinPrice symbol={item.symbol} data={data} />
                        </Box>
                        {profileReducer.result && (
                            <Button
                                variant='outlined'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 'max-content',
                                    width: 'max-content',
                                    margin: 'auto',
                                }}
                                type='button'
                                LinkComponent={Link}
                                href={routers.position}
                            >
                                open position
                            </Button>
                        )}
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export function CoinPrice({
    symbol,
    data: predict,
}: {
    symbol: string
    data: Predict
}) {
    const { data, isLoading } = useRealCoin(symbol)

    // Memoize the predictedSymbol to avoid recalculating it on every render
    const predictedSymbol = useMemo(() => {
        if (predict?.symbols) {
            return predict?.symbols.find(
                (sym) => sym.symbol.toLocaleLowerCase() === symbol,
            )
        }
        return null
    }, [predict, symbol])

    // Calculate the percentage difference
    const percentageDifference = useMemo(() => {
        if (data?.c && predictedSymbol?.predictedPrice) {
            const difference = predictedSymbol.predictedPrice - Number(data?.c)
            return (difference / Number(data.c)) * 100
        }
        return null
    }, [data?.c, predictedSymbol?.predictedPrice])

    return (
        <Box className='grid grid-cols-2'>
            <Box>
                {isLoading ? (
                    <Skeleton
                        variant='text'
                        animation='wave'
                        height={48}
                        width={120}
                    />
                ) : (
                    <Fragment>
                        <Prices c={data?.c!} p={+data?.p!} />
                        <Percentage p={+data?.P!} />
                    </Fragment>
                )}
            </Box>
            <Box>
                <Fragment>
                    <Typography
                        fontWeight={600}
                        variant='body1'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                        }}
                        className={
                            typeof predictedSymbol?.predictedPrice ===
                                'number' && data?.c !== undefined
                                ? predictedSymbol?.predictedPrice > +data.c
                                    ? 'text-LONG'
                                    : 'text-SHORT'
                                : ''
                        }
                    >
                        $
                        {predictedSymbol?.predictedPrice !== undefined
                            ? predictedSymbol.predictedPrice
                                  .toString()
                                  .indexOf('.') !== -1 &&
                              Number(
                                  predictedSymbol.predictedPrice
                                      .toString()
                                      .indexOf('.'),
                              ) >= 4
                                ? Number(
                                      predictedSymbol.predictedPrice,
                                  ).toFixed(2)
                                : Number(
                                      predictedSymbol.predictedPrice
                                          .toString()
                                          .indexOf('.'),
                                  ) >= 2
                                ? Number(
                                      predictedSymbol.predictedPrice,
                                  ).toFixed(5)
                                : Number(
                                      predictedSymbol.predictedPrice,
                                  ).toFixed(5)
                            : 'No Data'}{' '}
                        USDT
                    </Typography>
                    <Typography
                        fontWeight={600}
                        className={`${
                            Number(percentageDifference) > 0
                                ? 'text-LONG'
                                : 'text-SHORT'
                        }`}
                        sx={{
                            fontSize: {
                                sm: 15,
                            },
                        }}
                    >
                        {percentageDifference?.toFixed(2)}%
                    </Typography>
                </Fragment>
            </Box>
        </Box>
    )
}

export function Prices({ c, p }: { c: string; p: number }) {
    return (
        <Typography
            fontWeight={600}
            variant='body1'
            className={`${Number(p) > 0 ? 'text-LONG' : 'text-SHORT'}`}
            sx={{
                fontSize: {
                    sm: 15,
                },
            }}
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
            sx={{
                fontSize: {
                    sm: 15,
                },
            }}
        >
            {Number(p) > 0
                ? `+${Number(p).toFixed(2)}%`
                : `${Number(p).toFixed(2)}%`}
        </Typography>
    )
}

export function PriceLaning({ symbol }: { symbol: string }) {
    const { data, isLoading } = useRealCoin(symbol)

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
        <Box
            className='col-span-2'
            sx={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'end',
                flexDirection: 'row',
                columnGap: 1,
            }}
        >
            {isLoading ? (
                <Skeleton animation='wave' height={45} width={80} />
            ) : (
                <Typography
                    fontWeight={600}
                    className={`${
                        Number(data?.p) > 0 ? 'text-LONG' : 'text-SHORT'
                    }`}
                    sx={{
                        height: '45px',
                        display: 'flex',
                        alignItems: 'end',
                    }}
                    variant='body1'
                >
                    ${formatPrice(data?.c!)}
                </Typography>
            )}
            {isLoading ? (
                <Skeleton animation='wave' height={45} width={50} />
            ) : (
                <Typography
                    fontWeight={600}
                    className={`${
                        Number(data?.P) > 0 ? 'text-LONG' : 'text-SHORT'
                    }`}
                    sx={{
                        height: '45px',
                        display: 'flex',
                        alignItems: 'end',
                        width: '50px',
                    }}
                    variant='body1'
                >
                    {Number(data?.P) > 0
                        ? `+${Number(data?.P).toFixed(2)}%`
                        : `${Number(data?.P).toFixed(2)}%`}
                </Typography>
            )}
        </Box>
    )
}
