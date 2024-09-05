'use client'

import { profileSelector } from '@/app/common/store/slices/profileSlice'
import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import LeakAddIcon from '@mui/icons-material/LeakAdd'
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart'
import { routers } from '@/app/common/constant/path'

const pages = [
    {
        page: 'Predict',
        path: routers.predict,
        icon: <LeakAddIcon />,
    },
    {
        page: 'Position',
        path: routers.position,
        icon: <WaterfallChartIcon />,
    },
]

type Props = {}

export default function Menus({}: Props) {
    const profileReducer = useSelector(profileSelector)

    return (
        <>
            {pages
                .filter(
                    (page) =>
                        !(page.page === 'Position' && !profileReducer.result),
                )
                .map((page) => (
                    <Button
                        key={page.page}
                        sx={{ my: 2, display: 'block' }}
                        component={Link}
                        href={page.path}
                    >
                        {page.page}
                    </Button>
                ))}
        </>
    )
}
