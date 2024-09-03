'use client'

import { useKey } from '@/app/common/hooks/useKey'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
    Divider,
    Box,
    Tab,
    Stack,
    Typography,
    Button,
    Skeleton,
} from '@mui/material'
import React, { Fragment, useState } from 'react'
import ApiKeyForm from '../form/ApiKeyForm'
import { useQueryClient } from '@tanstack/react-query'
import { keys } from '@/app/common/constant/key'
import { IoMdKey } from 'react-icons/io'

type Props = {}

export default function TabProfile({}: Props) {
    const [value, setValue] = useState<string>('1')
    const { data, isPending } = useKey()
    const [open, setOpen] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const refetch = () => {
        queryClient.invalidateQueries({ queryKey: [keys.key] })
        queryClient.invalidateQueries({ queryKey: [keys.usdt] })
    }
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault()
        setValue(newValue)
    }

    return (
        <Fragment>
            <TabContext value={value}>
                <Divider />
                <Box>
                    <TabList
                        onChange={handleChange}
                        aria-label='lab API tabs example'
                    >
                        <Tab
                            sx={{
                                fontSize: 12,
                                color:
                                    value === '1'
                                        ? 'primary.main'
                                        : 'secondary.main',
                                fontWeight: value === '1' ? 'bold' : 'normal',
                            }}
                            label='Secret'
                            value='1'
                        />
                    </TabList>
                </Box>
                <TabPanel value='1'>
                    <Fragment>
                        {data?.apiKey && (
                            <Typography
                                variant='h6'
                                fontWeight={600}
                                fontSize={15}
                            >
                                API Key
                            </Typography>
                        )}
                        {isPending ? (
                            <Skeleton
                                variant='text'
                                // width={422}
                                sx={{ fontSize: 18 ,width:{
                                    xs: 200,
                                    sm: 400
                                }}}
                            />
                        ) : (
                            data?.apiKey && (
                                <Typography
                                    variant='h6'
                                    fontWeight={500}
                                    fontSize={17}
                                    sx={{ width: 'fit-content' }}
                                >
                                    {data.apiKey.replace(/./g, '*').substring(0, 20)}
                                </Typography>
                            )
                        )}
                    </Fragment>
                    {data?.apiKey && <Divider />}
                    <Fragment>
                        {data?.secretKey && (
                            <Typography
                                variant='h6'
                                fontWeight={600}
                                fontSize={15}
                            >
                                SECRET Key
                            </Typography>
                        )}
                        {isPending ? (
                            <Skeleton
                                variant='text'
                                sx={{ fontSize: 18 ,width:{
                                    xs: 200,
                                    sm: 400
                                }}}
                            />
                        ) : (
                            data?.secretKey && (
                                <Typography
                                    variant='h6'
                                    fontWeight={500}
                                    fontSize={17}
                                    sx={{ width: 'fit-content' }}
                                >
                                    {data.secretKey.replace(/./g, '*').substring(0, 20)}
                                </Typography>
                            )
                        )}
                    </Fragment>
                    {data?.secretKey && <Divider />}
                    {!data?.apiKey && (
                        <Stack
                            direction='column'
                            spacing={2}
                            alignItems='center'
                            justifyContent='center'
                            sx={{
                                height: '100%',
                            }}
                        >
                            <Typography
                                variant='h6'
                                fontWeight={600}
                                fontSize={20}
                            >
                                You have not added the secret key and api key
                                yet.
                            </Typography>
                            <Button
                                variant='contained'
                                onClick={handleOpen}
                                size='small'
                                startIcon={
                                    <IoMdKey style={{ marginRight: -4 }} />
                                }
                                sx={{
                                    p: 1.5,
                                    height: {
                                        xs: 32,
                                    },
                                    fontSize: {
                                        xs: 12,
                                        sm: 14,
                                        md: 16,
                                    },
                                }}
                            >
                                API Key
                            </Button>
                        </Stack>
                    )}
                </TabPanel>
                <TabPanel value='2'>Item Two</TabPanel>
            </TabContext>
            <ApiKeyForm
                open={open}
                handleClose={handleClose}
                refetch={refetch}
            />
        </Fragment>
    )
}
