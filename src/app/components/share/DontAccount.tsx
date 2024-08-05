import { routers } from '@/app/common/constant/path'
import { Card, Typography, Link as LinkMui } from '@mui/material'
import Link from 'next/link'

type Props = {}

export function DontAccount({}: Props) {
    return (
        <Card elevation={3} className='w-96 p-3 flex justify-center gap-x-2'>
            <Typography fontWeight={400}>
                Don&apos;t have an account?
            </Typography>
            <LinkMui
                component={Link}
                href={routers.signup}
                fontWeight={600}
                fontSize={14}
                className='mt-[1px]'
            >
                Sign Up
            </LinkMui>
        </Card>
    )
}
