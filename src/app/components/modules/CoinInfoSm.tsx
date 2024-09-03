'use client'

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Stack,
    Typography,
    Skeleton,
} from '@mui/material'
import React, { Fragment, useMemo } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { symbol } from '@/app/common/constant/symbols'
import { useRealCoin } from '@/app/common/hooks/useRealCoin'
import Link from 'next/link'
import { routers } from '@/app/common/constant/path'
import { Predict } from '@/app/common/types/predict.type'
import dayjs from 'dayjs'

type Props = {
    data: Predict
}

export default function CoinInfoSm({ data }: Props) {
    return (
        <Fragment>
            {symbol.map((item) => (
                <Card key={item.symbol} sx={{ mb: 1.5 }}>
                    <CardContent>
                        <Stack
                            direction={'row'}
                            spacing={2}
                            justifyContent={'space-between'}
                        >
                            <Stack direction='row' spacing={1}>
                                {item.icon}
                                <Typography variant='h5' component='div'>
                                    {item.nameShort}
                                </Typography>
                            </Stack>
                            <Price symbol={item.symbol} />
                        </Stack>
                        <Stack direction='row' justifyContent='space-between'>
                            <Typography
                                sx={{ color: 'text.secondary', mb: 1.5 }}
                            >
                                {item.nameLong}
                            </Typography>
                            <Percentage symbol={item.symbol} />
                        </Stack>
                        <Typography variant='body1' color='text.secondary'>
                            Prediction
                        </Typography>
                        <PredictPrice symbol={item.symbol} data={data} />
                    </CardContent>
                    <CardActions>
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            sx={{
                                width: '100%',
                            }}
                        >
                            <Typography
                                alignItems='center'
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: 14,
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                {dayjs(data.date).format('DD/MM/YYYY')}
                            </Typography>
                            <Button
                                size='small'
                                startIcon={<ArrowForwardIcon />}
                                LinkComponent={Link}
                                href={routers.position}
                            >
                                Add to position
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>
            ))}
        </Fragment>
    )
}

function PredictPrice({
    symbol,
    data: predict,
}: {
    symbol: string
    data: Predict
}) {
    const { data } = useRealCoin(symbol)

    // Memoize the predictedSymbol to avoid recalculating it on every render
    const predictedSymbol = useMemo(() => {
        if (predict?.symbols) {
            return predict.symbols.find(
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
        <Stack direction='row' spacing={1}>
            <Typography
                fontWeight={600}
                variant='body1'
                component='div'
                className={
                    typeof predictedSymbol?.predictedPrice === 'number' &&
                    data?.c !== undefined
                        ? predictedSymbol?.predictedPrice > +data.c
                            ? 'text-LONG'
                            : 'text-SHORT'
                        : ''
                }
            >
                $
                {predictedSymbol?.predictedPrice !== undefined
                    ? predictedSymbol.predictedPrice.toString().indexOf('.') !==
                          -1 &&
                      Number(
                          predictedSymbol.predictedPrice
                              .toString()
                              .indexOf('.'),
                      ) >= 4
                        ? Number(predictedSymbol.predictedPrice).toFixed(2)
                        : Number(
                              predictedSymbol.predictedPrice
                                  .toString()
                                  .indexOf('.'),
                          ) >= 2
                        ? Number(predictedSymbol.predictedPrice).toFixed(5)
                        : Number(predictedSymbol.predictedPrice).toFixed(5)
                    : 'No Data'}{' '}
                USDT
            </Typography>
            <Typography
                fontWeight={600}
                variant='body1'
                component='div'
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
                ({percentageDifference?.toFixed(2)}%)
            </Typography>
        </Stack>
    )
}

function Percentage({ symbol }: { symbol: string }) {
    const { data, isLoading } = useRealCoin(symbol)

    return (
        <Fragment>
            {isLoading ? (
                <Skeleton
                    animation='wave'
                    sx={{ fontSize: 16 }}
                    variant='text'
                    width={120}
                />
            ) : (
                <Typography
                    alignItems='flex-end'
                    fontWeight={600}
                    variant='body1'
                    className={`${
                        Number(data?.P) > 0 ? 'text-LONG' : 'text-SHORT'
                    }`}
                >
                    {Number(data?.P) > 0
                        ? `+${Number(data?.P)?.toFixed(2)}%`
                        : `${Number(data?.P).toFixed(2)}%`}
                </Typography>
            )}
        </Fragment>
    )
}

function Price({ symbol }: { symbol: string }) {
    const { data, isLoading } = useRealCoin(symbol)

    return (
        <Fragment>
            {isLoading ? (
                <Skeleton
                    animation='wave'
                    sx={{ fontSize: 16 }}
                    variant='text'
                    width={120}
                />
            ) : (
                <Typography
                    fontWeight={600}
                    variant='body1'
                    className={`${
                        Number(data?.p) > 0 ? 'text-LONG' : 'text-SHORT'
                    }`}
                >
                    $
                    {data?.c.indexOf('.') !== -1 &&
                    Number(data?.c.indexOf('.')) >= 4
                        ? Number(data?.c).toFixed(2)
                        : Number(data?.c.indexOf('.')) >= 3
                        ? Number(data?.c).toFixed(3)
                        : Number(data?.c.indexOf('.')) >= 2
                        ? Number(data?.c).toFixed(4)
                        : Number(data?.c.indexOf('.')) >= 1 &&
                          Number(data?.c).toFixed(5)}{' '}
                    USDT
                </Typography>
            )}
        </Fragment>
    )
}
