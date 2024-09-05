'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Divide as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import { Stack, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { routers } from '@/app/common/constant/path'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { usePathname } from 'next/navigation'
import HomeIcon from '@mui/icons-material/Home'

import LeakAddIcon from '@mui/icons-material/LeakAdd'
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart'

const pages = [
    {
        page: 'Predict',
        path: routers.predict,
        icon: <LeakAddIcon />,
    },
    {
        page: 'Position',
        path: routers.position,
        icon: <WaterfallChartIcon />,
    },
]

export default function Sidebar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    
    const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen)

    const DrawerList = (
        <Box
            sx={{ width: 250 }}
            role='presentation'
            onClick={toggleDrawer(false)}
        >
            <Stack
                direction='row'
                spacing={1}
                component={Toolbar}
                sx={{
                    justifyContent: 'center',
                }}
            >
                <Image
                    alt='logo-icon'
                    src='/logo/Logo.svg'
                    width={25}
                    height={25}
                />
                <Typography
                    variant='h1'
                    component='h1'
                    sx={{
                        margin: 'auto',
                    }}
                    fontWeight={800}
                    fontSize={25}
                    letterSpacing={1}
                >
                    Kerper Hub
                </Typography>
            </Stack>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        LinkComponent={Link}
                        href={routers.landing}
                        sx={{
                            backgroundColor:
                                pathname === routers.landing
                                    ? 'grey.100'
                                    : 'transparent',
                        }}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItemButton>
                </ListItem>
                {pages.map((item) => (
                    <ListItem key={item.page} disablePadding>
                        <ListItemButton
                            LinkComponent={Link}
                            href={item.path}
                            sx={{
                                backgroundColor:
                                    pathname === item.path
                                        ? 'grey.100'
                                        : 'transparent',
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.page} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['profile'].map((page) => (
                    <ListItem key={page} disablePadding>
                        <ListItemButton
                            LinkComponent={Link}
                            href={routers.profile}
                            sx={{
                                backgroundColor:
                                    pathname === routers.profile
                                        ? 'grey.100'
                                        : 'transparent',
                            }}
                        >
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary={page} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    )

    return (
        <div>
            <Hamburger toggled={open} toggle={setOpen} size={20} />
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    )
}
