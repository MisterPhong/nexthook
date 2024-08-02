'use client'

import {
    Box,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TabPanel, CustomTabPanel } from '../share/CustomTabPanel'
import PositionDesc from './PositionDesc'
import PositionOpen from './PositionOpen'
import { useRealPosition } from '@/app/common/hooks/usePosition'
import io, { Socket } from 'socket.io-client'

type Props = {}

const tabLabels = [`Positions(1)`, `Open Orders(0)`]

export default function Tabpanel({ }: Props) {
    const [activeTab, setActiveTab] = useState<number>(0)
    const { } = useRealPosition()
    // useEffect(() => {
    //     const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmE5ZmNhNzY1NzRiZDRmNDFjY2M2MmQiLCJ1c2VybmFtZSI6InRoZXdhcmF0LnRhbzE5QGdtYWlsLmNvbSIsImlhdCI6MTcyMjQ0NjUzNCwiZXhwIjoxNzIyNTMyOTM0fQ.Pg8qinvKZSX7l3iHJ3kpGv3E6WEAdqGsnqVmSnxrNls`

    //     const socket = io('http://localhost:9090', {
    //         query: {
    //             seed: '1234'
    //         },
    //         transportOptions: {
    //             polling: {
    //                 extraHeaders: {
    //                     Authorization: `Bearer ${accessToken}` // Use access token from cookies
    //                 }
    //             }
    //         }
    //     })

    //     socket.on('connect', () => {
    //         console.log('Connected to WebSocket server')
    //     })


    //     // Event listener for incoming messages
    //     // Emit a notification event
    //     socket.emit('position', '')

    //     // Event listener for incoming messages
    //     socket.on('position', (message) => {
    //         console.log('Received notification:', message)
    //     })

    //     // Clean up function
    //     return () => {
    //         socket.disconnect() // Disconnect socket when component unmounts
    //     }
    // }, []) // Depend on access_token change

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