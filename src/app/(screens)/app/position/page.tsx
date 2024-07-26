import {
    Card,
    CardContent,
    Typography,
    Box,
    Stack
} from '@mui/material'
import React from 'react'
import PositionForm from '@/app/_components/form/PositionForm'
import Tabpanel from '@/app/_components/modules/Tabpanel'

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