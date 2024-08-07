import { symbol } from '@/app/common/constant/symbols'
import { AnimationText } from '@/app/components/modules/AnimationText'
import { PriceLaning } from '@/app/components/modules/CoinInfo'
import { SquareSocialButton } from '@/app/components/share/SocialButton'
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import React from 'react'
import Image from 'next/image'

type Props = {}

export default async function page({}: Props) {
    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    zIndex: -1,
                    left: -100,
                    top: 0,
                }}
            >
                <Image alt='landing' src='/blob.svg' width={200} height={200} />
            </Box>
            <Box className='grid grid-cols-2 mt-10 max-w-screen-xl mx-auto'>
                <Stack
                    spacing={2}
                    direction={'column'}
                    sx={
                        {
                            // position: 'relative',
                        }
                    }
                >
                    <AnimationText />
                    <Stack direction={'row'} spacing={2}>
                        <TextField
                            label='Username'
                            size='small'
                            className='w-2/3'
                        />
                        <Button
                            variant='contained'
                            size='small'
                            className='w-1/4'
                        >
                            Sign Up
                        </Button>
                    </Stack>
                    <Box className='w-fit'>
                        <SquareSocialButton iconPath='/socialLogin/google.svg' />
                    </Box>
                    {/* <Box
                        sx={{
                            position: 'absolute',
                            zIndex: -1,
                            right: 50,
                            bottom: 30,
                            opacity: 0.7, // ปรับค่าตามที่ต้องการ
                        }}
                    >
                        <Image
                            alt='landing'
                            src='/blob1.svg'
                            width={200}
                            height={200}
                        />
                    </Box> */}
                </Stack>
                <Card className='max-w-2xl mx-auto'>
                    <CardContent>
                        <Stack
                            direction={'row'}
                            className='justify-between'
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                        >
                            <Typography fontWeight={600} color='secondary.main'>
                                symbols
                            </Typography>
                            <Typography
                                fontWeight={600}
                                className='flex justify-end w-1/2'
                                color='secondary.main'
                            >
                                price
                            </Typography>
                            <Typography fontWeight={600} color='secondary.main'>
                                chg%
                            </Typography>
                        </Stack>
                        {symbol.map((item) => (
                            <Box
                                key={item.symbol}
                                className='grid grid-cols-4 w-96 mb-2'
                            >
                                <Stack
                                    spacing={0.5}
                                    direction={'row'}
                                    className='items-end col-span-2'
                                >
                                    {item.icon}
                                    <Typography
                                        fontWeight={600}
                                        className='flex items-center'
                                    >
                                        {item.nameShort}
                                    </Typography>
                                    <Typography
                                        fontWeight={400}
                                        className='flex'
                                        variant='caption'
                                    >
                                        {item.nameLong}
                                    </Typography>
                                </Stack>
                                <PriceLaning symbol={item.symbol}/>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}
