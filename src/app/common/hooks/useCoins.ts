import { useState, useEffect } from "react";
import { CoinType } from "../types/coin.type";
import { useAppDispatch } from "../store/store";
import { setLoad } from "../store/slices/predictSlice";

export function useCoins(symbol: string) {
  const [coin, setCoin] = useState<CoinType>();
  const dispatch = useAppDispatch();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@kline_1m`
    );

    ws.onmessage = (event) => {
      setCoin(JSON.parse(event.data));
      //   dispatch(setLoad())
      setLoad(false);
    };

    // Cleanup WebSocket on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return {
    data: coin,
    load
  };
}
