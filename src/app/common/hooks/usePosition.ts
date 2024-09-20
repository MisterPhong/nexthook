import { getCookies } from '../actions/cookie-action'
import { cookieKey } from '../constant/cookie'
import { io } from 'socket.io-client'
import { ws } from '../constant/ws'
import { useQuery } from '@tanstack/react-query'
import { ErrorResponse } from '../types/error.type'
import { keys } from '../constant/key'
import { Positions } from '../types/position.type'
import { useAppDispatch } from '../store/store'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL as string

async function position(): Promise<Positions | null> {
    const accessToken = await getCookies(cookieKey.accessToken)

    if (!accessToken) return null

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
            // socket.emit(ws.joinUsdt, payload.sub) // ส่งคำขอเข้าร่วมห้อง
            socket.emit(ws.position, 'connect server!')
        })

        // Event listener for incoming messages
        socket.on(ws.position, (msg) => {
            if (
                typeof msg === 'object' &&
                msg !== null &&
                msg !== 'load position.'
            ) {
                // console.log(msg)
                resolve(msg)
            } else {
                // resolve(msg)
            }
        })

        socket.on('error', (error) => {
            reject(error)
        })
    })
}

export function usePosition() {

    return useQuery<Positions | null, ErrorResponse>({
        queryKey: [keys.position],
        queryFn: position,
        refetchOnWindowFocus: false, // ไม่ refetch ข้อมูลเมื่อ window กลับมา active
        refetchInterval: 1000, // อัปเดตข้อมูลทุก ๆ 1 วินาที (1000 มิลลิวินาที)
    })
}
