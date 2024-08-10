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
} from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import NotificationsIcon from '@mui/icons-material/Notifications'
// import {
//     useDeleteNotify,
//     useNotification,
//     useRealNotify,
//     useUpdateIsRead,
// } from '@/app/common/hooks/useNotification'
import { useSelector } from 'react-redux'
import { notifySelector } from '@/app/common/store/slices/notitySlice'
import DeleteIcon from '@mui/icons-material/Delete'
import { io } from 'socket.io-client'

type Props = {}

export default function Notification({}: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [open, setOpen] = useState(false)
    const popperRef = useRef<HTMLDivElement | null>(null)
    const notificationsReducer = useSelector(notifySelector)
    // const { data } = useNotification()
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
            // updateNotify();
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

    return (
        <Box className='flex items-center'>
            <Tooltip title='Notifications'>
                <IconButton onClick={handleClick}>
                    <Badge
                        badgeContent={notificationsReducer.notifysIsRead.length}
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
                            {/* {data && data.length > 0 ? (
                                <List>
                                    {data?.map((notification, index) => (
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary={notification.msg}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge='end'
                                                    aria-label='delete'
                                                    onClick={() =>
                                                        removeNotify(
                                                            notification.id,
                                                        )
                                                    }
                                                >
                                                    <DeleteIcon fontSize='small' />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
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
                            )} */}
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    )
}
