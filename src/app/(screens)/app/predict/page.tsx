'use client'
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Logo from "../../../assets/coins/btc.svg";
import { CoinType } from '@/app/common/types/coin.type';
import { symbol } from 'zod';

type Props = {};

export default function Page({ }: Props) {
    const [coin, setCoin] = useState<CoinType>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@kline_1m`);

        ws.onmessage = (event) => {
            setCoin(JSON.parse(event.data));
            setLoading(false);
        };

        // Cleanup WebSocket on component unmount
        return () => {
            ws.close();
        };
    }, []);

    return (

        <Box className="container bg-red-200 mx-auto mt-3">
            <Box className="grid grid-cols-5 w-full">
                {["symbol", "Date", "Current", "Predict", "Open order"].map((item) => (
                    <Box
                        key={item}
                    // display="flex"
                    // justifyContent="center"
                    // alignItems="center"
                    // className="flex items-center w-full"
                    >
                        <Typography variant="h6">{item}</Typography>
                    </Box>
                ))}
                <Logo
                    className="w-7 h-7"
                />
                <Typography variant="body1">15/07/2024</Typography>
                <Typography variant="body1">
                    {(coin?.k.c.indexOf('.') !== -1) &&
                        (Number(coin?.k.c.indexOf('.')) >= 4) ?
                        Number(coin?.k.c).toFixed(2)
                        : (Number(coin?.k.c.indexOf('.')) >= 3) ?
                            Number(coin?.k.c).toFixed(3)
                            : (Number(coin?.k.c.indexOf('.')) >= 2) ?
                                Number(coin?.k.c).toFixed(4)
                                : (Number(coin?.k.c.indexOf('.')) >= 1) &&
                                Number(coin?.k.c).toFixed(5)
                    } USDT
                </Typography>
                <Typography variant="body1">65,000</Typography>
                <button>
                    open
                </button>
            </Box>
        </Box>
    );
}
