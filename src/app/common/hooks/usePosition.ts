import { httpClient } from '@/app/common/services/httpClient'
import axios from 'axios'
import { server, wsUrl } from '../constant/server'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import { useQuery } from 'react-query'
import { PositionResponse } from '../types/position.type'
import { getCookies } from '../actions/cookie-action'
import { io } from 'socket.io-client'

async function profile(): Promise<PositionResponse[]> {
    try {
        const response = await httpClient.get<PositionResponse[]>(server.query_order)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = ErrorResponseSchema.safeParse(error.response.data)
            if (!parsedError.success) {
                throw new Error('Unexpected error format')
            }
            throw parsedError.data
        }
        throw new Error('Network or unexpected error')
    }
}

export function usePosition() {
    return useQuery<PositionResponse[], ErrorResponse>('position', profile, {
        retry: false,
    })
}

async function realPosition() {
    const accessToken = await getCookies('access_token')
    const seed = await getCookies('seed_phrase')

    return new Promise((resolve, reject) => {
        const socket = io('http://localhost:9090', {
            query: {
                seed: '1234'
            },
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: `Bearer ${accessToken}` // Use access token from cookies
                    }
                }
            }
        })

        socket.on('connect', () => {
            console.log('Connected to WebSocket server position')
        })

        socket.emit('position', '')

        // Event listener for incoming messages
        socket.on('position', (msg) => {
            console.log('Received position:', msg)
            resolve(msg)
        })

        socket.on('error', (error) => {
            reject(error)
        })
    })
}

export function useRealPosition() {
    return useQuery<any, ErrorResponse>(
        'real-position',
        () => realPosition(),
        {
            refetchInterval: false, // Disable automatic refetching
            refetchOnWindowFocus: false, // Disable refetching on window focus
        }
    )
}