import { InputLabel as Label } from '@mui/material'
import React from 'react'

type Props = {
    label: string
}

export default function InputLabel({ label }: Props) {
    return (
        <Label
            htmlFor='adjust-leverage'
            className='text-sm px-1 pb-1 font-sans'
        >
            {label}
        </Label>
    )
}
