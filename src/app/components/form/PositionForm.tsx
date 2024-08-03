'use client'

import { Autocomplete, Stack, TextField, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import InputLabel from '../share/InputLabel'
import CustomSlider from '../share/CustomSlider'
import theme from '../theme/theme'
import { useAddPosition } from '@/app/common/hooks/useAddPosition'
import { Position, PositionSchema } from '@/app/common/types/position.type'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {}

const symbols = [
    { symbol: 'BTCUSDT' },
    { symbol: 'ETHUSDT' },
    { symbol: 'ADAUSDT' },
    { symbol: 'DOGEUSDT' },
    { symbol: 'BNBUSDT' },
]

export default function PositionForm({}: Props) {
    const [symbol, setSymbol] = useState('')
    const [timefram, setTimefram] = useState('')
    const { mutate } = useAddPosition()
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm<Position>({
        resolver: zodResolver(PositionSchema),
    })

    return (
        <Stack
            component={'form'}
            className='max-w-lg'
            spacing={1}
            onSubmit={handleSubmit((data) => {
                setTimefram('')
                setSymbol('')
                reset()
                mutate({
                    symbol: data.symbol,
                    leverage: data.leverage,
                    quantity: data.quantity,
                    timeframe: data.timeframe,
                    ema: data.ema,
                })
            })}
        >
            <Stack spacing={2} direction={'row'}>
                <Box>
                    <InputLabel label='Symbols' />
                    <Autocomplete
                        value={symbol}
                        onChange={(_event, newValue: any) => {
                            setSymbol(newValue)
                        }}
                        className='w-40'
                        disablePortal
                        id='combo-box-demo'
                        options={symbols.map((item) => item.symbol)}
                        isOptionEqualToValue={(option, value) =>
                            option === value
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                {...register('symbol', { required: true })}
                                className='w-full'
                                size='small'
                                error={!!errors.symbol}
                                helperText={
                                    !!errors.symbol
                                        ? 'Please select a symbol.'
                                        : ''
                                }
                            />
                        )}
                    />
                </Box>
                <Box>
                    <InputLabel label='Size' />
                    <TextField
                        error={!!errors.quantity}
                        helperText={
                            !!errors.quantity
                                ? 'Please enter the size.'
                                : watch('quantity') < 15
                                ? 'Must be at least 15'
                                : ''
                        }
                        className='w-40'
                        type='number'
                        size='small'
                        {...register('quantity', {
                            required: true,
                            valueAsNumber: true,
                            min: 15,
                        })}
                    />
                </Box>
                <Box>
                    <InputLabel label='Timeframs' />
                    <Autocomplete
                        value={timefram}
                        onChange={(_event, newValue: any) => {
                            setTimefram(newValue)
                        }}
                        className='w-40'
                        disablePortal
                        id='timeframs'
                        options={['1h', '4h', '1d']}
                        isOptionEqualToValue={(option, value) =>
                            option === value
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                {...register('timeframe', { required: true })}
                                fullWidth
                                size='small'
                                error={!!errors.timeframe}
                                helperText={
                                    !!errors.timeframe
                                        ? 'Please select a timeframe.'
                                        : ''
                                }
                            />
                        )}
                    />
                </Box>
            </Stack>
            <Box>
                <InputLabel label='Adjust Leverage' />
                <Controller
                    name='leverage'
                    control={control}
                    defaultValue={10}
                    render={({ field }) => (
                        <CustomSlider
                            {...field}
                            aria-label='Leverage'
                            valueLabelDisplay='auto'
                            step={1}
                            marks
                            min={5}
                            max={20}
                        />
                    )}
                />
            </Box>
            <Box>
                <InputLabel label='Adjust EMA' />
                <Controller
                    name='ema'
                    control={control}
                    defaultValue={20}
                    render={({ field }) => (
                        <CustomSlider
                            {...field}
                            aria-label='ema'
                            valueLabelDisplay='auto'
                            step={1}
                            marks
                            min={10}
                            max={30}
                        />
                    )}
                />
            </Box>
            <Button
                variant='contained'
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }}
                type='submit'
            >
                open order
            </Button>
        </Stack>
    )
}
