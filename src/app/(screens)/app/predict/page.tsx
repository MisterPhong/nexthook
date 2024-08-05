import { CoinInfo } from '@/app/components/modules/CoinInfo'
import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'

type Props = {}

export default function Page({}: Props) {
    return (
        <Card>
            <CardContent>
                <Box className='grid grid-cols-5 w-full'>
                    {[
                        'symbol',
                        'date',
                        'current',
                        'predict',
                        'open position',
                    ].map((item) => (
                        <Box key={item}>
                            <Typography
                                variant='body1'
                                className={`${
                                    item === 'open position' &&
                                    'flex justify-center'
                                }`}
                            >
                                {item}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Divider/>
                <CoinInfo />
            </CardContent>
        </Card>
    )
}
