import { useState, useEffect, useRef } from 'react'
import { Coin } from '../types/coin.type'

export function useCoins(symbol: string) {
  const [coin, setCoin] = useState<Coin>()
  const [load, setLoad] = useState(true)
  const prevPriceRef = useRef<number | null>(null)
  // const [percentage, setPercentage] = useState<boolean | null>()

  useEffect(() => {
    const ws = new WebSocket(
      // `wss://stream.binance.com:9443/ws/${symbol}@kline_1m`
      `wss://stream.binance.com:9443/ws/${symbol}@ticker`
    )

    ws.onmessage = (event) => {
      const newCoin = JSON.parse(event.data) as Coin
      // console.log(JSON.parse(event.data))
      // const newPrice = newCoin?.k?.c // สมมติว่าราคาอยู่ที่ newCoin.k.c
      // const newPrice = newCoin.c // สมมติว่าราคาอยู่ที่ newCoin.k.c
      // const prevPrice = prevPriceRef.current

      // if (prevPrice !== null) {
      //   if (+newPrice < prevPrice) {
      //     // ราคาใหม่ต่ำกว่าราคาเก่า
      //     // ทำการเปลี่ยนสีเป็นสีแดง
      //     setPercentage(false)
      //   } else if (+newPrice > prevPrice) {
      //     // ราคาใหม่สูงกว่าราคาเก่า
      //     // ทำการเปลี่ยนสีเป็นสีเขียว
      //     setPercentage(true)
      //   }
      // }

      // prevPriceRef.current = +newPrice // เก็บราคาปัจจุบันเป็นราคาก่อนหน้า
      setCoin(newCoin)
      setLoad(false)
    }

    // Cleanup WebSocket on component unmount
    return () => {
      ws.close()
    }
  }, [symbol]) // เพิ่ม symbol เป็น dependency เพื่อให้ WebSocket อัพเดตหาก symbol เปลี่ยน

  return {
    data: coin,
    isLoading: load,
    // percentage
  }
}