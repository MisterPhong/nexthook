'use client'

import { Box, Typography, Stack, Button } from '@mui/material'
import React, { Fragment } from 'react'
import { usePosition } from '@/app/common/hooks/usePosition'
import dayjs from 'dayjs'
import { useClosePosition } from '@/app/common/hooks/useClosePostion'

type Props = {}

export default function PositionDescSm({}: Props) {
    const { data, isPending } = usePosition()
    const { mutate, isPending: closePending } = useClosePosition()
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
            ) : typeof data?.message === 'string'  ? (
                <h1></h1>
            ) : (
                data?.message.map((item) => (
                    <Fragment key={item.id || item.symbol}>
                        <Stack
                            direction='row'
                            spacing={0.5}
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <Stack
                                direction='row'
                                spacing={0.5}
                                alignItems='center'
                            >
                                <Typography variant='h6'>
                                    {item.info.symbol}
                                </Typography>
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
                            <Typography
                                variant='h6'
                                sx={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                }}
                                className={
                                    item.info.positionSide === 'LONG'
                                        ? 'text-LONG'
                                        : 'text-SHORT'
                                }
                            >
                                {item.info.positionSide}
                            </Typography>
                        </Stack>
                        <Stack direction='column' spacing={1}>
                            {[
                                { label: 'price', value: item.info.entryPrice },
                                {
                                    label: 'quantity',
                                    value: `${Number(
                                        item.info.isolatedWallet,
                                    ).toFixed(2)} USDT`,
                                },
                                {
                                    label: 'PNL(ROI %)',
                                    value: `${item.unrealizedPnl?.toFixed(
                                        2,
                                    )} USDT(${item.percentage}%)`,
                                },
                                ...(item.type !== 'AI'
                                    ? [{ label: 'timefram', value: '5m' }]
                                    : []), // เพิ่มเงื่อนไขตรงนี้
                                // { label: 'timefram', value: '5m' },
                                {
                                    label: 'created at',
                                    value: dayjs(item.timestamp).format(
                                        'DD/MM/YYYY',
                                    ),
                                },
                                { label: 'type', value: item.type },
                            ].map((row, index) => (
                                <Stack
                                    key={index}
                                    direction='row'
                                    justifyContent='space-between'
                                >
                                    <Typography variant='body1'>
                                        {row.label}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        className={
                                            row.label === 'PNL(ROI %)' &&
                                            item.unrealizedPnl
                                                ? +item.unrealizedPnl >= 0
                                                    ? 'text-LONG'
                                                    : 'text-SHORT'
                                                : ''
                                        }
                                    >
                                        {row.value}
                                    </Typography>
                                </Stack>
                            ))}
                            <Button
                                variant='contained'
                                disabled={closePending}
                                onClick={() => mutate(item.orderId)}
                            >
                                Close position
                            </Button>
                        </Stack>
                    </Fragment>
                ))
            )}
        </Box>
    )
}
