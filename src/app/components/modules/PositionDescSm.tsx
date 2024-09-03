'use client'

import { Box, Typography, Stack, Button } from '@mui/material'
import React, { Fragment } from 'react'
import { alpha } from '@mui/material/styles'
import { usePosition } from '@/app/common/hooks/usePosition'
import dayjs from 'dayjs'
type Props = {}

export default function PositionDescSm({}: Props) {
    const { data, isPending } = usePosition()

    return (
        <Box
            sx={{
                mt: 2,
            }}
        >
            {isPending ? (
                <h1>load...</h1>
            ) : typeof data === 'string' ? (
                data === 'Not found orders.' ? (
                    <h1>not found order</h1>
                ) : (
                    <h1>{data}</h1> // แสดงข้อความอื่นๆ ที่เป็น string
                )
            ) : (
                data?.message.map((item) => (
                    <Fragment key={item.id || item.symbol}>
                        <Stack
                            direction='row'
                            spacing={0.5}
                            alignItems='center'
                        >
                            <Typography variant='h6'>{item.info.symbol}</Typography>
                            <Typography variant='subtitle1'>
                                Perpetual
                            </Typography>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    px: 1,
                                    py: 0,
                                    fontSize: 14,
                                    borderRadius: 0.5,
                                }}
                                className='bg-Yellow'
                            >
                                {item.info.leverage}x
                            </Typography>
                        </Stack>
                        <Stack direction='column' spacing={1}>
                            {[
                                { label: 'price', value: item.info.entryPrice },
                                { label: 'quantity', value: `${Number(item.info.isolatedMargin).toFixed(2)} USDT` },
                                {
                                    label: 'PNL(ROI %)',
                                    value: `${item.unrealizedPnl} USDT(${item.percentage}%)`,
                                },
                                // { label: 'timefram', value: '5m' },
                                { label: 'created at', value: dayjs(item.timestamp).format('DD/MM/YYYY')},
                                { label: 'type', value: 'AI' },
                            ].map((item, index) => (
                                <Stack
                                    key={index}
                                    direction='row'
                                    justifyContent='space-between'
                                >
                                    <Typography variant='body1'>
                                        {item.label}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        className={
                                            item.label === 'PNL(ROI %)'
                                                ? +item.value >= 0
                                                    ? 'text-LONG'
                                                    : 'text-SHORT'
                                                : ''
                                        }
                                    >
                                        {item.value}
                                    </Typography>
                                </Stack>
                            ))}
                            <Button variant='contained'>Close position</Button>
                        </Stack>
                    </Fragment>
                ))
            )}
        </Box>
    )
}
