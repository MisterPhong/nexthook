'use client'

import { usePosition } from '@/app/common/hooks/usePosition'
import React from 'react'

type Props = {}

export default function PositionOpen({ }: Props) {
    const { data } = usePosition()

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}