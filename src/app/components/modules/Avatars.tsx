'use client'

import { routers } from '@/app/common/constant/path'
import { useLogout } from '@/app/common/hooks/useLogout'
import { useProfile } from '@/app/common/hooks/useProfile'
import { profileSelector } from '@/app/common/store/slices/profileSlice'
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
import React from 'react'
import { useSelector } from 'react-redux'
import Notification from './Notification'
import { useRouter } from 'next/navigation'

type Props = {}

const settings = ['My profile', 'Account', 'Logout']

export function Avatars({}: Props) {
    const router = useRouter()
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    )
    const { mutate } = useLogout()
    const {} = useProfile()
    const profileReducer = useSelector(profileSelector)

    const handleCloseUserMenu = () => setAnchorElUser(null)

    const handleMenuItemClick = (setting: string) => {
        handleCloseUserMenu()
        if (setting === settings[2]) {
            mutate()
        } else if (setting === settings[0]) {
            router.push(routers.profile)
        }
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorElUser(event.currentTarget)

    return (
        <>
            {profileReducer.result ? (
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
                                    />
                                ) : (
                                    <Avatar />
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
    const { data, isLoading } = useProfile()

    return (
        <Stack direction='row' className='items-center'>
            {isLoading ? (
                <Skeleton
                    animation='wave'
                    variant='circular'
                    width={70}
                    height={70}
                />
            ) : data?.picture ? (
                <Avatar
                    alt='profile'
                    src={data.picture}
                    sx={{ width: 70, height: 70 }}
                />
            ) : (
                <Avatar alt='profile' sx={{ width: 70, height: 70 }} />
            )}
            <Stack direction='column' className='ml-4'>
                {isLoading ? (
                    <Skeleton width={184.77} />
                ) : (
                    <Typography variant='h2' fontWeight={600} fontSize={18}>
                        {data?.name}
                    </Typography>
                )}
                {isLoading ? (
                    <Skeleton width={184.77} />
                ) : (
                    <Typography variant='caption' fontSize={15}>
                        {data?.username}
                    </Typography>
                )}
                {isLoading ? (
                    <Skeleton width={184.77} />
                ) : (
                    <Typography variant='caption' fontSize={15}>
                        {data?.email}
                    </Typography>
                )}
            </Stack>
        </Stack>
    )
}
