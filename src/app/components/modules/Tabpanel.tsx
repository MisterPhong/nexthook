'use client'

import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TabPanel, CustomTabPanel } from '../share/CustomTabPanel'
import PositionDesc from './PositionDesc'
import PositionOpen from './PositionOpen'
import { useAppDispatch } from '@/app/common/store/store'
import {
    positionAsync,
    positionSelector,
} from '@/app/common/store/slices/positionSlicen'
import { useSelector } from 'react-redux'
import PositionDescSm from './PositionDescSm'

type Props = {}

export default function Tabpanel({}: Props) {
    const dispatch = useAppDispatch()
    const [activeTab, setActiveTab] = useState<number>(0)
    const positionReducer = useSelector(positionSelector)

    useEffect(() => {
        dispatch(positionAsync())
    }, [dispatch])

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1 }}>
                {[
                    `Positions`,
                    `Open Orders ${
                        positionReducer.result.length !== 0
                            ? `(${positionReducer.result.length})`
                            : ''
                    }`,
                ].map((label, index) => (
                    <TabPanel
                        key={index}
                        label={label}
                        isActive={activeTab === index}
                        onClick={() => setActiveTab(index)}
                    />
                ))}
            </Box>

            <CustomTabPanel value={activeTab} index={0}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        display: {
                            xs: 'none',
                            sm: 'block',
                        },
                    }}
                >
                    <Grid
                        container
                        direction='row'
                        justifyContent='space-around'
                        alignItems='center'
                    >
                        {[
                            'symbol',
                            'price',
                            'quantity',
                            'PNL(ROI %)',
                            'timefram',
                            'created at',
                            'type',
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
                                    height: 'auto',
                                }}
                            >
                                <Typography variant='body2'>{item}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'block',
                        },
                    }}
                >
                    <PositionDesc />
                </Box>
                <Box
                    sx={{
                        display: {
                            sm: 'none',
                        },
                    }}
                >
                    <PositionDescSm />
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={1}>
                <PositionOpen />
            </CustomTabPanel>
        </Box>
    )
}
