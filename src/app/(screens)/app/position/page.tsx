import {
    Card,
    CardContent,
    Typography,
    Box
} from '@mui/material'
import React from 'react'
import PositionDesc from '@/app/_components/modules/PositionDesc'

type Props = {}

export default function page({ }: Props) {
    return (
        <Card>
            <CardContent>
                <Box
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    <Box
                        className='mt-3 grid grid-cols-8 mx-3'
                    >
                        {['symbol', 'price', 'quantity', 'PNL(ROI %)', 'timefram', 'created at', 'type', 'Close Positions'].map((item) => (
                            <Box
                                key={item}
                                className={`flex ${item !== 'symbol' && 'justify-center'} ${item === 'Close Positions' && 'text-Primary'}`}
                            >
                                <Typography
                                    variant='body2'
                                >
                                    {item}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <PositionDesc />
            </CardContent>
        </Card>
    )
}