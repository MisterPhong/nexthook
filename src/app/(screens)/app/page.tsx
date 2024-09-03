import { symbol } from '@/app/common/constant/symbols'
import { PriceLaning } from '@/app/components/modules/CoinInfo'
import { SquareSocialButton } from '@/app/components/share/SocialButton'

import {
    Grid,
    Box,
    Stack,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
} from '@mui/material'

import React from 'react'
import Image from 'next/image'
import BgAnimation from '@/app/components/modules/BgAnimation'
import { TextTypewriter } from '@/app/components/modules/AnimationText'

type Props = {}

export default async function page({}: Props) {
    return (
        <>
            <Box
                sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        lg: 'block',
                    },
                    position: 'absolute',
                    zIndex: -1,
                    left: -100,
                    top: 0,
                }}
            >
                <Image alt='landing' src='/blob.svg' width={200} height={200} />
            </Box>
            <BgAnimation />
            <Box
                sx={{
                    mt: 1,
                    maxWidth: 'lg',
                    mx: 'auto',
                }}
            >
                <Grid
                    container
                    direction={{ xs: 'column', md: 'row' }}
                    sx={{mx: 'auto'}}
                >
                    <Grid item xs={12} md={6}>
                        <Stack
                            spacing={2}
                            direction={'column'}
                            sx={{
                                height: '100%',
                                justifyContent: 'center',
                                mx: 2,
                                mt: 2,
                            }}
                        >
                            <TextTypewriter />
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
                        </Stack>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            mx: {
                                sm: 'auto',
                                md: 0,
                            },
                        }}
                    >
                        <Card
                            elevation={3}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.8)', // สีขาวที่มีความทึบ 50%
                                mx: 3,
                                width: {
                                    sm: 550,
                                    lg: 400,
                                },
                                mt: 3,
                            }}
                        >
                            <CardContent>
                                <Stack
                                    direction={'row'}
                                    justifyContent='space-between'
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Typography
                                        fontWeight={600}
                                        color='secondary.main'
                                    >
                                        symbols
                                    </Typography>
                                    <Typography
                                        fontWeight={600}
                                        sx={{
                                            flex: 1,
                                            textAlign: 'end',
                                            mx: 5,
                                        }}
                                        color='secondary.main'
                                    >
                                        price
                                    </Typography>
                                    <Typography
                                        fontWeight={600}
                                        color='secondary.main'
                                    >
                                        chg%
                                    </Typography>
                                </Stack>
                                {symbol.map((item) => (
                                    <Box
                                        key={item.symbol}
                                        className='grid grid-cols-4 mb-2'
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
                                        <PriceLaning symbol={item.symbol} />
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
