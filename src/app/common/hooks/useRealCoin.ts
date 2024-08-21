'use client'

import { useState, useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import { useQueryClient } from '@tanstack/react-query'
import { Coin } from '../types/coin.type'

export function useRealCoin(symbol: string) {
    const SOCKET_URL = `wss://stream.binance.com:9443/ws/${symbol}@ticker`
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(true)

    useWebSocket(SOCKET_URL, {
        onMessage: (event) => {
            const newCoin: Coin = JSON.parse(event.data)
            queryClient.setQueryData(['coin', symbol], newCoin)
        },
        shouldReconnect: () => true, // Reconnect on close
    })

    const data = queryClient.getQueryData<Coin>(['coin', symbol])

    useEffect(() => {
        if (data) {
            setIsLoading(false) // หยุดการโหลดถ้ามีข้อมูลใน cache
        }
    }, [data])

    return {
        data,
        isLoading,
    }
}
