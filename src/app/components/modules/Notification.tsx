'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
    Box,
    Tooltip,
    IconButton,
    Badge,
    Popper,
    Grow,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Typography,
    Skeleton,
} from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    isDeletedAsync,
    isReadedAsync,
    notificationAsync,
    notificationSelector,
    setAllAsRead,
    setPop,
} from '@/app/common/store/slices/notiticationSlice'
import { useAppDispatch } from '@/app/common/store/store'

type Props = {}

export default function Notification({}: Props) {
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [open, setOpen] = useState(false)
    const popperRef = useRef<HTMLDivElement | null>(null)
    const notificationsReducer = useSelector(notificationSelector)
    // const { data, isPending } = useNotification()
    // const {} = useRealNotify()
    // const { mutate: removeNotify } = useDeleteNotify()
    // const { mutate: updateNotify } = useUpdateIsRead()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (open) {
            setOpen(false)
        } else {
            setAnchorEl(event.currentTarget)
            setOpen(true)
            // Update isRead to true
            dispatch(isReadedAsync())
        }
    }

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (
                popperRef.current &&
                !popperRef.current.contains(event.target as Node) &&
                anchorEl &&
                !anchorEl.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        },
        [anchorEl],
    )

    useEffect(() => {
        if (open) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open, handleClickOutside]) // add handleClickOutside to the dependency array

    useEffect(() => {
        dispatch(notificationAsync())
    }, [dispatch])

    return (
        <Box className='flex items-center'>
            {notificationsReducer.isPending ? (
                <Skeleton variant='circular' width={30} height={30} />
            ) : (
                <Tooltip title='Notifications'>
                    <IconButton onClick={handleClick}>
                        <Badge
                            badgeContent={
                                notificationsReducer.result.filter(
                                    (item) => !item.isReaded,
                                ).length
                            }
                            color='primary'
                        >
                            {open ? (
                                <NotificationsIcon
                                    color='action'
                                    fontSize='medium'
                                />
                            ) : (
                                <NotificationsNoneIcon
                                    color='action'
                                    fontSize='medium'
                                />
                            )}
                        </Badge>
                    </IconButton>
                </Tooltip>
            )}

            <Popper
                open={open}
                anchorEl={anchorEl}
                placement='bottom-end'
                transition
                ref={popperRef}
            >
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps} timeout={350}>
                        <Paper
                            sx={{
                                width: '200px',
                                maxHeight: '300px', // กำหนด max-height
                                overflow: 'auto', // กำหนดการเลื่อน
                            }}
                        >
                            {notificationsReducer.result &&
                            notificationsReducer.result.length > 0 ? (
                                <List>
                                    {notificationsReducer.result.map(
                                        (item, index) => (
                                            <ListItem key={index}>
                                                <ListItemText
                                                    primary={item.msg}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        edge='end'
                                                        aria-label='delete'
                                                        onClick={() =>
                                                            dispatch(
                                                                isDeletedAsync(item._id)
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon fontSize='small' />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ),
                                    )}
                                </List>
                            ) : (
                                <Typography
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    No new notifications
                                </Typography>
                            )}
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    )
}
