import { io } from 'socket.io-client'
import { getCookies } from '../actions/cookie-action'
import { cookieKey } from '../constant/cookie'
import { useQuery } from '@tanstack/react-query'
import { ErrorResponse } from '../types/error.type'
import { JwtPayload } from '../types/jwt-payload.type'
import { jwtDecode } from 'jwt-decode'
import { UsdtDisplay } from '../types/usdt-display.type'
import { ws } from '../constant/ws'
import { keys } from '../constant/key'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL as string

async function usdtDisplay(): Promise<UsdtDisplay | null> {
    const accessToken = await getCookies(cookieKey.accessToken)

    if (!accessToken) return null

    const payload: JwtPayload = jwtDecode(accessToken)

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
            socket.emit(ws.joinUsdt, payload.sub) // ส่งคำขอเข้าร่วมห้อง
            socket.emit(ws.usdt, 'This is a message from client!')
        })

        // Event listener for incoming messages
        socket.on(ws.usdt, (msg) => {
            console.log(msg)
            resolve(msg)
        })

        socket.on('error', (error) => {
            reject(error)
        })
    })
}

export function useUsdtDisplay() {
    return useQuery<UsdtDisplay | null, ErrorResponse>({
        queryKey: [keys.usdt],
        queryFn: usdtDisplay,
        refetchOnWindowFocus: false, // ไม่ refetch ข้อมูลเมื่อ window กลับมา active
    })
}
