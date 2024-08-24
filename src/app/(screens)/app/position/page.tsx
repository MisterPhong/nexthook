import PositionScreen from '@/app/components/screens/PositionScreen'
import { Card, CardContent, Stack } from '@mui/material'
import React from 'react'

type Props = {}

export default function page({}: Props) {
    return (
        <Card>
            <CardContent component={Stack} spacing={2} direction={'column'}>
                <PositionScreen />
            </CardContent>
        </Card>
    )
}
