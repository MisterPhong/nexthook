// 'use client'

// import {
//     Autocomplete,
//     Stack,
//     TextField,
//     Box,
//     Button,
//     ButtonGroup,
// } from '@mui/material'
// import { useState } from 'react'
// import { Controller, useForm } from 'react-hook-form'
// import InputLabel from '../share/InputLabel'
// import CustomSlider from '../share/CustomSlider'
// import theme from '../theme/theme'
// import { Position, PositionsForm } from '@/app/common/types/position.type'
// import { useAppDispatch } from '@/app/common/store/store'
// import { positionAddAsync } from '@/app/common/store/slices/positionSlicen'
// import { symbol as symbols } from '@/app/common/constant/symbols'
// import { usePredict } from '@/app/common/hooks/usePredict'
// type Props = {}

// export default function PositionForm({}: Props) {
//     const dispatch = useAppDispatch()
//     const [symbol, setSymbol] = useState('')
//     const [timefram, setTimefram] = useState('')
//     const [type, setType] = useState('AI')

//     const { data: predictData } = usePredict()

//     const {
//         register,
//         handleSubmit,
//         control,
//         reset,
//         watch,
//         formState: { errors },
//     } = useForm({})

//     return (
//         <Stack
//             component={'form'}
//             className='max-w-lg'
//             spacing={1}
//             onSubmit={handleSubmit((data) => {
//                 setTimefram('')
//                 setSymbol('')
//                 reset()
//                 const payload: PositionsForm = {
//                     symbol: data.symbol,
//                     leverage: data.leverage,
//                     quantity: data.quantity,
//                     timeframe: data.timeframe,
//                     ema: data.ema,
//                     type,
//                     status: predictData?.symbols.find(
//                         (s) => s.symbol === data.symbol,
//                     )?.position,
//                     // status: 'Short'
//                 }
//                 dispatch(positionAddAsync(payload))
//             })}
//         >
//             <ButtonGroup variant='text' aria-label='Basic button group'>
//                 {['AI', 'EMA'].map((item) => (
//                     <Button
//                         key={item}
//                         sx={(theme) => ({
//                             width: 100,
//                             color:
//                                 type !== item
//                                     ? 'gray'
//                                     : theme.palette.primary.main,
//                                     borderBottom: type === item ? 2 : 'none',
//                         })}
//                         onClick={() => setType(item)}
//                         // disabled={type === item}
//                     >
//                         {item}
//                     </Button>
//                 ))}
//             </ButtonGroup>
//             <Stack spacing={2} direction={'row'}>
//                 <Box>
//                     <InputLabel label='symbols' />
//                     <Autocomplete
//                         value={symbol}
//                         onChange={(_event, newValue: any) => {
//                             setSymbol(newValue)
//                         }}
//                         className='w-40'
//                         disablePortal
//                         id='combo-box-demo'
//                         options={symbols.map((item) =>
//                             item.symbol.toUpperCase(),
//                         )}
//                         isOptionEqualToValue={(option, value) =>
//                             option === value
//                         }
//                         renderInput={(params) => (
//                             <TextField
//                                 {...params}
//                                 {...register('symbol', { required: true })}
//                                 className='w-full'
//                                 size='small'
//                                 error={!!errors.symbol}
//                                 helperText={
//                                     !!errors.symbol
//                                         ? 'Please select a symbol.'
//                                         : ''
//                                 }
//                             />
//                         )}
//                     />
//                 </Box>
//                 <Box>
//                     <InputLabel label='size' />
//                     <TextField
//                         error={!!errors.quantity}
//                         helperText={
//                             !!errors.quantity
//                                 ? 'Please enter the size.'
//                                 : watch('quantity') < 10
//                                 ? 'Must be at least 15'
//                                 : ''
//                         }
//                         className='w-40'
//                         type='number'
//                         size='small'
//                         {...register('quantity', {
//                             required: true,
//                             valueAsNumber: true,
//                             min: 10,
//                         })}
//                     />
//                 </Box>
//             </Stack>
//             {type === 'EMA' && (
//                 <Box>
//                     <InputLabel label='timeframs' />
//                     <Autocomplete
//                         value={timefram}
//                         onChange={(_event, newValue: any) => {
//                             setTimefram(newValue)
//                         }}
//                         className='w-40'
//                         disablePortal
//                         id='timeframs'
//                         options={['1h', '4h', '1d']}
//                         isOptionEqualToValue={(option, value) =>
//                             option === value
//                         }
//                         renderInput={(params) => (
//                             <TextField
//                                 {...params}
//                                 {...register('timeframe', {
//                                     required: true,
//                                 })}
//                                 fullWidth
//                                 size='small'
//                                 error={!!errors.timeframe}
//                                 helperText={
//                                     !!errors.timeframe
//                                         ? 'Please select a timeframe.'
//                                         : ''
//                                 }
//                             />
//                         )}
//                     />
//                 </Box>
//             )}
//             <Box>
//                 <InputLabel label='Adjust Leverage' />
//                 <Controller
//                     name='leverage'
//                     control={control}
//                     defaultValue={10}
//                     render={({ field }) => (
//                         <CustomSlider
//                             {...field}
//                             aria-label='Leverage'
//                             valueLabelDisplay='auto'
//                             step={1}
//                             marks
//                             min={5}
//                             max={20}
//                         />
//                     )}
//                 />
//             </Box>
//             {type === 'EMA' && (
//                 <Box>
//                     <InputLabel label='Adjust EMA' />
//                     <Controller
//                         name='ema'
//                         control={control}
//                         defaultValue={20}
//                         render={({ field }) => (
//                             <CustomSlider
//                                 {...field}
//                                 aria-label='ema'
//                                 valueLabelDisplay='auto'
//                                 step={1}
//                                 marks
//                                 min={10}
//                                 max={30}
//                             />
//                         )}
//                     />
//                 </Box>
//             )}
//             <Button
//                 variant='contained'
//                 sx={{
//                     backgroundColor: theme.palette.primary.main,
//                     color: theme.palette.primary.contrastText,
//                     '&:hover': {
//                         backgroundColor: theme.palette.primary.dark,
//                     },
//                 }}
//                 type='submit'
//             >
//                 open position
//             </Button>
//         </Stack>
//     )
// }

'use client'

import {
    Autocomplete,
    Stack,
    TextField,
    Box,
    Button,
    ButtonGroup,
} from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import InputLabel from '../share/InputLabel'
import CustomSlider from '../share/CustomSlider'
import theme from '../theme/theme'
import { Position, PositionsForm } from '@/app/common/types/position.type'
import { useAppDispatch } from '@/app/common/store/store'
import { positionAddAsync } from '@/app/common/store/slices/positionSlicen'
import { symbol as symbols } from '@/app/common/constant/symbols'
import { usePredict } from '@/app/common/hooks/usePredict'
type Props = {}

export default function PositionForm({}: Props) {
    const dispatch = useAppDispatch()
    const [symbol, setSymbol] = useState('')
    const [timefram, setTimefram] = useState('')
    const [type, setType] = useState('AI')

    const { data: predictData } = usePredict()

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm({})

    return (
        <Stack
            component={'form'}
            className='max-w-lg'
            spacing={1}
            onSubmit={handleSubmit((data) => {
                setTimefram('')
                setSymbol('')
                reset()
                const payload: PositionsForm = {
                    symbol: data.symbol,
                    leverage: data.leverage,
                    quantity: data.quantity,
                    timeframe: data.timeframe,
                    ema: data.ema,
                    type,
                    status: predictData?.symbols.find(
                        (s) => s.symbol === data.symbol,
                    )?.position,
                    // status: 'Short'
                }
                dispatch(positionAddAsync(payload))
            })}
        >
            <ButtonGroup variant='text' aria-label='Basic button group'>
                {['AI', 'EMA'].map((item) => (
                    <Button
                        key={item}
                        sx={(theme) => ({
                            width: 100,
                            color:
                                type !== item
                                    ? 'gray'
                                    : theme.palette.primary.main,
                                    borderBottom: type === item ? 2 : 'none',
                        })}
                        onClick={() => setType(item)}
                        // disabled={type === item}
                    >
                        {item}
                    </Button>
                ))}
            </ButtonGroup>
            <Stack spacing={2} direction={'row'}>
                <Box>
                    <InputLabel label='symbols' />
                    <Autocomplete
                        value={symbol}
                        onChange={(_event, newValue: any) => {
                            setSymbol(newValue)
                        }}
                        className='w-40'
                        disablePortal
                        id='combo-box-demo'
                        options={symbols.map((item) =>
                            item.symbol.toUpperCase(),
                        )}
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
                    <InputLabel label='size' />
                    <TextField
                        error={!!errors.quantity}
                        helperText={
                            !!errors.quantity
                                ? 'Please enter the size.'
                                : watch('quantity') < 10
                                ? 'Must be at least 15'
                                : ''
                        }
                        className='w-40'
                        type='number'
                        size='small'
                        {...register('quantity', {
                            required: true,
                            valueAsNumber: true,
                            min: 10,
                        })}
                    />
                </Box>
            </Stack>
            {type === 'EMA' && (
                <Box>
                    <InputLabel label='timeframs' />
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
                                {...register('timeframe', {
                                    required: true,
                                })}
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
            )}
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
            {type === 'EMA' && (
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
            )}
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
                open position
            </Button>
        </Stack>
    )
}