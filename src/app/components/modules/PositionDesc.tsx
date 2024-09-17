import { Box, Button, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { usePosition } from '@/app/common/hooks/usePosition'
import dayjs from 'dayjs'
import { useClosePosition } from '@/app/common/hooks/useClosePostion'

type Props = {}

export default function PositionDesc({}: Props) {
  const { data, isPending } = usePosition()
  const { mutate, isPending: closePending } = useClosePosition()

  return (
    <Box
      sx={{ borderBottom: 1, borderColor: 'divider' }}
      className='w-full h-16 grid grid-cols-8 items-center'
    >
      {isPending ? (
        <h1>load...</h1>
      ) : typeof data === 'string' ? (
        data === 'Not found orders.' ? (
          <h1>not found order</h1>
        ) : (
          <h1>{data}</h1> // แสดงข้อความอื่นๆ ที่เป็น string
        )
      ) : typeof data?.message === 'string' ? (
        <h1></h1>
      ) : (
        data?.message.map((item) => (
          <Fragment key={item.id || item.symbol}>
            <Box className='flex items-center'>
              <Box
                className={`${
                  item.info.positionSide === 'LONG' ? 'bg-LONG' : 'bg-SHORT'
                }  w-1.5 h-16 mr-2`}
              />
              <Symbols
                symbol={item.info.symbol}
                leverage={item.info.leverage}
              />
            </Box>

            <Box className='flex justify-center'>
              {(+item.info.entryPrice).toFixed(2)}
            </Box>

            <Box className='flex justify-center'>
              {(+item.info.isolatedWallet).toFixed(2)} USDT
            </Box>

            <Box className='flex flex-col justify-center mx-auto'>
              <Typography
                className={`${
                  item.unrealizedPnl
                    ? +item.unrealizedPnl >= 0
                      ? 'text-LONG'
                      : 'text-SHORT'
                    : ''
                }`}
              >
                {item.unrealizedPnl?.toFixed(2) ?? '0.00'} USDT
              </Typography>
              <Typography
                className={`mx-auto ${
                  item.unrealizedPnl
                    ? +item.unrealizedPnl >= 0
                      ? 'text-LONG'
                      : 'text-SHORT'
                    : ''
                }`}
              >
                ({item.percentage})%
              </Typography>
            </Box>
            <Box className='flex justify-center'>-</Box>
            <Box className='flex justify-center'>
              {dayjs(item.timestamp).format('DD/MM/YYYY')}
            </Box>
            <Box className='flex justify-center'>
              {item.type === 'EMA' ? `EMA/${item.ema}` : item.type}
            </Box>
            <Box className='flex justify-center'>
              <Button
                size='medium'
                sx={(theme) => ({
                  color: theme.palette.primary.main,
                })}
                onClick={() => mutate(item.orderId)}
                disabled={closePending}
              >
                close position
              </Button>
            </Box>
          </Fragment>
        ))
      )}
    </Box>
  )
}

function Symbols({ symbol, leverage }: { symbol: string; leverage: string }) {
  return (
    <Box>
      <Typography className='text-base'>{symbol}</Typography>
      <Box className='bg-Yellow w-fit px-0.5 rounded-sm'>{leverage}x</Box>
    </Box>
  )
}
