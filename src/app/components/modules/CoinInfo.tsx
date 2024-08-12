'use client'

import { symbol } from '@/app/common/constant/symbols'
import { useRealCoin } from '@/app/common/hooks/useRealCoin'
import { Box, Stack, Typography, Button, Skeleton } from '@mui/material'

type Props = {}

export function CoinInfo({}: Props) {
    return (
        <Box>
            {symbol.map((item) => (
                <Box key={item.symbol}>
                    <Box
                        sx={{
                            height: 'max-content',
                        }}
                        className='grid grid-cols-5'
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
                            15/07/2024
                        </Typography>
                        <CoinPrice symbol={item.symbol} />
                        <Typography
                            fontWeight={500}
                            variant='body1'
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'start',
                            }}
                        >
                            65,000
                        </Typography>
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
                        >
                            open
                        </Button>
                    </Box>
                    {/* <Divider /> */}
                </Box>
            ))}
        </Box>
    )
}

export function CoinPrice({ symbol }: { symbol: string }) {
    // const { data, isLoading } = useCoins(symbol)
    const { data, isLoading } = useRealCoin(symbol)

    return (
        <Box>
            {isLoading ? (
                <Skeleton animation='wave' height={48} width={120} />
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
