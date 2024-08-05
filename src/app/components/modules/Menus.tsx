'use client'

import { routers } from '@/app/common/constant/path'
import { profileSelector } from '@/app/common/store/slices/profileSlice'
import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const pages = [
    {
        page: 'Predict',
        path: routers.predict,
    },
    {
        page: 'Position',
        path: routers.position,
    },
]

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
