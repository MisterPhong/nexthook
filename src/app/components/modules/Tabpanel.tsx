'use client'

import {
    Box,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { TabPanel, CustomTabPanel } from '../share/CustomTabPanel'
import PositionDesc from './PositionDesc'
import PositionOpen from './PositionOpen'

type Props = {}

const tabLabels = [`Positions(1)`, `Open Orders(0)`]

export default function Tabpanel({ }: Props) {
    const [activeTab, setActiveTab] = useState<number>(0)

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {tabLabels.map((label, index) => (
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
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={1}>
                <PositionOpen />
            </CustomTabPanel>
        </Box>
    )
}