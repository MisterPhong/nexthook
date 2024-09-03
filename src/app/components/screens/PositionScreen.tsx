'use client'

import { routers } from '@/app/common/constant/path'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
import React, { Fragment } from 'react'
import PositionForm from '../form/PositionForm'
import Tabpanel from '../modules/Tabpanel'
import { useKey } from '@/app/common/hooks/useKey'
import { IoMdKey } from 'react-icons/io'

type Props = {}

export default function PositionScreen({}: Props) {
    const { data, isPending } = useKey()

    return (
        <Fragment>
            {isPending ? (
                <h1>load...</h1>
            ) : data?.apiKey ? (
                <Box
                    sx={{
                        height: `calc(100vh - 140px)`, // ลดความสูงของส่วนหัว
                    }}
                >
                    <PositionForm />
                    <Tabpanel />
                </Box>
            ) : (
                <Box
                    sx={{
                        height: `calc(100vh - 140px)`, // ลดความสูงของส่วนหัว
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden', // ป้องกันการเลื่อน
                    }}
                >
                    <Button
                        variant='contained'
                        LinkComponent={Link}
                        href={routers.profile}
                        startIcon={<IoMdKey style={{ marginRight: -4 }} />}
                    >
                        Add API key
                    </Button>
                </Box>
            )}
        </Fragment>
    )
}
