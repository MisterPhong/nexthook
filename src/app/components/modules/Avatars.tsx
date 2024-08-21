'use client'

import {
    Avatar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Skeleton,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Notification from './Notification'
import { useRouter } from 'next/navigation'
import { routers } from '@/app/common/constant/path'
import { useNotification } from '@/app/common/hooks/useNotification'
import { useAppDispatch } from '@/app/common/store/store'
import { profileSelector, logoutAsync, profileAsync } from '@/app/common/store/slices/profileSlice'

type Props = {}

const settings = ['My profile', 'Account', 'Logout']

export function Avatars({}: Props) {
    const router = useRouter()
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const profileReducer = useSelector(profileSelector)
    const dispatch = useAppDispatch()
    const {} = useNotification()

    const handleCloseUserMenu = () => setAnchorElUser(null)

    const handleMenuItemClick = (setting: string) => {
        handleCloseUserMenu()
        if (setting === settings[2]) {
            dispatch(logoutAsync())
            router.push(routers.landing)
        } else if (setting === settings[0]) {
            router.push(routers.profile)
        }
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorElUser(event.currentTarget)

    useEffect(() => {
        dispatch(profileAsync())
    }, [dispatch])

    return (
        <>
            {profileReducer.isPending ? (
                <Stack spacing={2} direction={'row'}>
                    <Skeleton variant='circular' width={30} height={30} />
                    <Skeleton variant='circular' width={30} height={30} />
                </Stack>
            ) : profileReducer.result ? (
                <Box sx={{ flexGrow: 0 }}>
                    <Stack spacing={2} direction={'row'}>
                        <Notification />
                        <Tooltip title='Open settings'>
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                {profileReducer.result.picture ? (
                                    <Avatar
                                        alt='picture'
                                        src={profileReducer.result.picture}
                                        sx={{ width: 30, height: 30 }}
                                    />
                                ) : (
                                    <Avatar sx={{ width: 30, height: 30 }} />
                                )}
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Menu
                        sx={{ mt: '45px' }}
                        id='menu-appbar'
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem
                                key={setting}
                                onClick={() => handleMenuItemClick(setting)}
                            >
                                <Typography textAlign='center'>
                                    {setting}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            ) : (
                <>
                    <Button
                        variant='contained'
                        LinkComponent={Link}
                        href={routers.signup}
                    >
                        Sign Up
                    </Button>
                    <Button
                        variant='text'
                        LinkComponent={Link}
                        href={routers.login}
                    >
                        Login
                    </Button>
                </>
            )}
        </>
    )
}

export function Profile() {
    const profileReducer = useSelector(profileSelector)

    return (
        <Stack direction='row' className='items-center'>
            {profileReducer.isPending ? (
                <Skeleton
                    animation='wave'
                    variant='circular'
                    width={70}
                    height={70}
                />
            ) : profileReducer.result?.picture ? (
                <Avatar
                    alt='profile'
                    src={profileReducer.result.picture}
                    sx={{ width: 70, height: 70 }}
                />
            ) : (
                <Avatar alt='profile' sx={{ width: 70, height: 70 }} />
            )}
            <Stack direction='column' className='ml-4'>
                {profileReducer.isPending ? (
                    <Skeleton width={184.77} />
                ) : (
                    <Typography variant='h2' fontWeight={600} fontSize={18}>
                        {profileReducer.result?.name}
                    </Typography>
                )}
                {profileReducer.isPending ? (
                    <Skeleton width={184.77} />
                ) : (
                    <Typography variant='caption' fontSize={15}>
                        {profileReducer.result?.username}
                    </Typography>
                )}
                {profileReducer.isPending ? (
                    <Skeleton width={184.77} />
                ) : (
                    <Typography variant='caption' fontSize={15}>
                        {profileReducer.result?.email}
                    </Typography>
                )}
            </Stack>
        </Stack>
    )
}
