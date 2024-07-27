import { Coin } from "../types/coin.type";
import { useQuery } from 'react-query'

async function fetchCoin(symbol: string): Promise<Coin> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@ticker`
    );

    ws.onmessage = (event) => {
      const newCoin = JSON.parse(event.data) as Coin;
      resolve(newCoin);
      ws.close();
    };

    ws.onerror = (error) => {
      reject(error);
    };
  });
}

export function useCoins(symbol: string) {
  return useQuery<Coin>(["coin", symbol], () => fetchCoin(symbol), {
    // staleTime: 1000 * 60, // 1 minute
    // cacheTime: 1000 * 60 * 5, // 5 minutes
  });
}
