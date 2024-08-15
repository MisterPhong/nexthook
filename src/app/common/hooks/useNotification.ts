'use client'

import io from 'socket.io-client'
import { useQuery } from '@tanstack/react-query'
import { getCookies } from '../actions/cookie-action'
import { setAddNotification } from '../store/slices/notiticationSlice'
import { AppDispatch, useAppDispatch } from '../store/store'
import { ErrorResponse } from '../types/error.type'
import { NotificationElement } from '../types/notification.type'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL as string

function generateObjectId(): string {
    const timestamp = Math.floor(Date.now() / 1000).toString(16) // ใช้ timestamp เป็น 8 characters แรก
    const randomHex = () =>
        Math.floor(Math.random() * 0x1000000)
            .toString(16)
            .padStart(6, '0') // สร้างส่วนที่เหลือแบบสุ่ม

    return (
        timestamp + randomHex() + randomHex() + randomHex().slice(0, 2) // ตัดให้เหลือ 24 characters
    )
}

async function notification(
    dispatch: AppDispatch
): Promise<NotificationElement> {
    const accessToken = await getCookies('access_token')
    
    return new Promise((resolve, reject) => {
        const socket = io(SOCKET_URL, {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: `Bearer ${accessToken}`, // Use access token from cookies
                    },
                },
            },
        })

        socket.on('connect', () => {
            console.log('Connected to WebSocket server')
            socket.emit('notification', 'Hello from client!')
        })

        // Event listener for incoming messages
        socket.on('notification', (msg) => {
            const payload: NotificationElement = {
                _id: generateObjectId(),
                msg,
                isReaded: false,
                createdAt: new Date().toISOString(), // แปลง Date เป็น string
                readedAt: null,
                deletedAt: null,
            }
            dispatch(setAddNotification(payload))
            resolve(payload)
        })

        socket.on('error', (error) => {
            reject(error)
        })
    })
}

export function useNotification() {
    const dispatch = useAppDispatch()

    return useQuery<NotificationElement, ErrorResponse>({
        queryKey: ['notification'],
        queryFn: () => notification(dispatch),
        refetchOnWindowFocus: false, // ไม่ refetch ข้อมูลเมื่อ window กลับมา active
    })
}
