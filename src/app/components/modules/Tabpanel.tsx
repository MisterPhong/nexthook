'use client'

import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TabPanel, CustomTabPanel } from '../share/CustomTabPanel'
import PositionDesc from './PositionDesc'
import PositionOpen from './PositionOpen'
import { useAppDispatch } from '@/app/common/store/store'
import { positionAsync, positionSelector } from '@/app/common/store/slices/positionSlicen'
import { useSelector } from 'react-redux'

type Props = {}

export default function Tabpanel({}: Props) {
    const dispatch = useAppDispatch()
    const [activeTab, setActiveTab] = useState<number>(0)
    const positionReducer = useSelector(positionSelector)

    useEffect(() => {
        dispatch(positionAsync())
    }, [])

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {[`Positions(1)`, `Open Orders(${positionReducer.result.length})`].map((label, index) => (
                    <TabPanel
                        key={index}
                        label={label}
                        isActive={activeTab === index}
                        onClick={() => setActiveTab(index)}
                    />
                ))}
            </Box>

            <CustomTabPanel value={activeTab} index={0}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                                <Typography variant='body2' >{item}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <PositionDesc />
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={1}>
                <PositionOpen />
            </CustomTabPanel>
        </Box>
    )
}
