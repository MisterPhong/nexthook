'use client'

import { Button, ButtonPropsVariantOverrides } from '@mui/material'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { routers } from '@/app/common/constant/path'
import { OverridableStringUnion } from '@mui/types'

type Props = {
    label: string
    variant?:
        | OverridableStringUnion<
              'text' | 'contained' | 'outlined',
              ButtonPropsVariantOverrides
          >
        | undefined
}

export function CustomButton({ label, variant }: Props) {
    const { pending } = useFormStatus()

    return (
        <Button variant={variant} LinkComponent={Link} href={routers.login}>
            {label}
        </Button>
    )
}
