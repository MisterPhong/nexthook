import PositionForm from '@/app/components/form/PositionForm'
import Tabpanel from '@/app/components/modules/Tabpanel'
import {
    Card,
    CardContent,
    Typography,
    Box,
    Stack
} from '@mui/material'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <Card>
            <CardContent
                component={Stack}
                spacing={2}
                direction={'column'}
            >
                <PositionForm />
                <Tabpanel />
            </CardContent>
        </Card>
    )
}