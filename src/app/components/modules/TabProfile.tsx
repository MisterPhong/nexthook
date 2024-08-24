'use client'

import { useKey } from '@/app/common/hooks/useKey'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Divider, Box, Tab, Stack, Typography, Button } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { FaKeycdn } from 'react-icons/fa'
import ApiKeyForm from '../form/ApiKeyForm'
import TextKey from './TextKey'
import { useQueryClient } from '@tanstack/react-query'

type Props = {}

export default function TabProfile({}: Props) {
    const [value, setValue] = useState<string>('1')
    const { data, isPending } = useKey()
    const [open, setOpen] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const refetchKey = () =>
        queryClient.invalidateQueries({ queryKey: ['key'] })
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
                    {isPending ? (
                        <h1>load...</h1>
                    ) : data?.apiKey ? (
                        <Stack direction='column' spacing={0.3}>
                            <TextKey text={data.apiKey} title='API KEY' />
                            <Divider />
                            <TextKey text={data.secretKey} title='SECRET KEY' />
                            <Divider />
                        </Stack>
                    ) : (
                        <Stack
                            direction='column'
                            spacing={2}
                            alignItems='center'
                            justifyContent='center'
                            sx={{
                                height: '100%',
                            }}
                        >
                            <FaKeycdn size={50} color='#6b6e78' />
                            <Typography
                                variant='h6'
                                fontWeight={600}
                                fontSize={20}
                            >
                                You have not added the secret key and api key
                                yet.
                            </Typography>
                            <Button
                                sx={{
                                    width: 'max-content',
                                }}
                                variant='contained'
                                onClick={handleOpen}
                            >
                                Add secret
                            </Button>
                        </Stack>
                    )}
                </TabPanel>
                <TabPanel value='2'>Item Two</TabPanel>
            </TabContext>
            <ApiKeyForm
                open={open}
                handleClose={handleClose}
                refetchKey={refetchKey}
            />
        </Fragment>
    )
}
