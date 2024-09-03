import { keys } from '@/app/common/constant/key'
import { predict } from '@/app/common/hooks/usePredict'
import { CoinInfo } from '@/app/components/modules/CoinInfo'
import CoinInfoSm from '@/app/components/modules/CoinInfoSm'
import { getQueryClient } from '@/app/components/utilities/react-query-provider'
import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
} from '@mui/material'
import { dehydrate } from '@tanstack/react-query'
import React from 'react'
import { HydrationBoundary } from '@tanstack/react-query'
import { Predict } from '@/app/common/types/predict.type'

type Props = {}

export default async function Page({}: Props) {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: [keys.predict],
        queryFn: predict,
    })

    const dehydratedState = dehydrate(queryClient)

    const data = queryClient.getQueryData([keys.predict]) as Predict

    return (
        <HydrationBoundary state={dehydratedState}>
            <Card
                sx={{
                    backgroundColor: {
                        xs: 'transparent',
                        sm: 'white',
                    },
                    boxShadow: {
                        xs: 'none',
                        sm: '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
                    },
                }}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'block', // ใช้ 'block' แทน 'grid' เพราะจะใช้ MUI Grid ในการจัดการเลย์เอาต์
                            },
                            width: '100%',
                        }}
                    >
                        <Grid container spacing={2}>
                            {[
                                'symbol',
                                'date',
                                'current',
                                'predict',
                                'action',
                            ].map((item) => (
                                <Grid
                                    item
                                    xs={12} // เต็มความกว้างบนหน้าจอขนาดเล็ก
                                    sm={2.4} // แบ่ง 5 คอลัมน์เท่าๆ กันในหน้าจอขนาดใหญ่
                                    key={item}
                                    container
                                    justifyContent={
                                        item === 'action'
                                            ? 'center'
                                            : 'flex-start'
                                    }
                                >
                                    <Typography
                                        variant='body1'
                                        align={
                                            item === 'action'
                                                ? 'center'
                                                : 'left'
                                        }
                                    >
                                        {item}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Divider
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'block',
                            },
                        }}
                    />
                    <Box
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'block',
                            },
                        }}
                    >
                        <CoinInfo data={data} />
                    </Box>
                    <Box
                        sx={{
                            display: {
                                sm: 'none',
                            },
                        }}
                    >
                        <CoinInfoSm data={data}/>
                    </Box>
                </CardContent>
            </Card>
        </HydrationBoundary>
    )
}
