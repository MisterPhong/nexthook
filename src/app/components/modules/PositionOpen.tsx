'use client'

import { positionSelector } from '@/app/common/store/slices/positionSlicen'
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'

type Props = {}

export default function PositionOpen({}: Props) {
    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Grid
                    container
                    direction='row'
                    justifyContent='space-around'
                    alignItems='center'
                >
                    {[
                        'symbol',
                        'quantity',
                        'timeframe',
                        'leverage',
                        'type',
                        'created at',
                        'Close Positions',
                    ].map((item) => (
                        <Grid
                            key={item}
                            item
                            xs
                            sx={{
                                display: 'flex',
                                justifyContent:
                                    item === 'symbol' ? 'start' : 'center',
                            }}
                        >
                            <Typography variant='body2'>{item}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Desc />
        </Box>
    )
}

function Desc() {
    const positionReducer = useSelector(positionSelector)

    return (
        <Box>
            {positionReducer.result.map((item) => (
                <Grid
                    container
                    direction='row'
                    justifyContent='space-around'
                    alignItems='center'
                    columns={8}
                    key={item.id}
                    sx={{
                        marginY: 1,
                        height: '3rem',
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}
                >
                    <Grid
                        item
                        xs
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                        }}
                    >
                        <Typography lineHeight={'1.5rem'} variant='body1'>
                            {item.symbol}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography lineHeight={'1.5rem'} variant='body1'>
                            {item.quantity}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography lineHeight={'1.5rem'} variant='body1'>
                            {item.timeframe}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography lineHeight={'1.5rem'} variant='body1'>
                            {item.leverage}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography lineHeight={'1.5rem'} variant='body1'>
                            {item.type}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography lineHeight={'1.5rem'} variant='body1'>
                            {dayjs(item.created_at).format('DD/MM/YYYY')}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center', // เพิ่มบรรทัดนี้เพื่อให้อยู่ตรงกลางในแกน Y
                            fontSize: '0.3rem',
                        }}
                    >
                        <IconButton
                            sx={{
                                height: '2rem',
                                width: '2rem',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'primary.main',
                                color: 'White',
                                '&:hover': {
                                    backgroundColor: 'secondary.main',
                                    color: 'primary.dark',
                                },
                                transition: 'background-color 0.3s, color 0.3s',
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
        </Box>
    )
}
