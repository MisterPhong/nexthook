'use client'

import { Box } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import { keyframes } from '@mui/system'

type Props = {}

const upDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`

export default function BgAnimation({}: Props) {
    return (
        <Box
            sx={{
                display: {
                    xs: 'none',
                    md: 'block',
                },
                position: 'absolute',
                zIndex: -1,
                left: {
                  md: 400,
                  lg: 500,
                  xl: 650
                },
                buttom: 0,
                animation: `${upDown} 3s ease-in-out infinite`, // ใช้ animation ที่สร้าง
            }}
        >
            <Image
                alt='landing'
                src='/undraw_stars_re_6je7.svg'
                width={700}
                height={700}
            />
        </Box>
    )
}
