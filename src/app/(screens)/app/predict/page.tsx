'use client'
import { profileSelector } from '@/app/common/store/slices/profileSlice'
import { CoinInfo } from '@/app/components/modules/CoinInfo'
import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {}

export default function Page({}: Props) {
    const profileReducer = useSelector(profileSelector)

    return (
        <Card>
            <CardContent>
                <Box
                    className={`grid grid-cols-${
                        profileReducer.result ? '5' : '4'
                    } w-full`}
                >
                    {[
                        'symbol',
                        'date',
                        'current',
                        'predict',
                        ...(profileReducer.result ? ['action'] : []),
                    ].map((item) => (
                        <Box key={item}>
                            <Typography
                                variant='body1'
                                className={`${
                                    item === 'action' && 'flex justify-center'
                                }`}
                            >
                                {item}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Divider />
                <CoinInfo />
            </CardContent>
        </Card>
    )
}
