"use client";

import { symbol } from "@/app/common/constant/symbols";
import { useCoins } from "@/app/common/hooks/useCoins";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {};

export default function CoinInfo({}: Props) {
  return (
    <Box>
      {symbol.map((item) => (
        <Box key={item.symbol} className="grid grid-cols-5 w-full">
          <Stack spacing={0.5} direction={"row"} className="items-center">
            {item.icon}
            <Typography fontWeight={600} className="flex items-center">
              {item.nameShort}
            </Typography>
            <Typography fontWeight={400} className="flex" variant="caption">
              {item.nameLong}
            </Typography>
          </Stack>
          <Typography fontWeight={500} className="mt-5" variant="body1">
            15/07/2024{" "}
          </Typography>
          <CoinPrice symbol={item.symbol} />
          <Typography fontWeight={500} className="mt-5" variant="body1">
            65,000
          </Typography>
          <button>open</button>
        </Box>
      ))}
    </Box>
  );
}

function CoinPrice({ symbol }: { symbol: string }) {
  const { data, isLoading } = useCoins(symbol);

  return (
    <Box className={`${!isLoading ? "mt-2" : "mt-[-5px]"}`}>
      {isLoading ? (
        <Skeleton className="mt-2" animation="wave" height={50} width={120} />
      ) : (
        <Box>
          <Typography
            fontWeight={600}
            variant="body1"
            className={`${Number(data?.p) > 0 ? "text-LONG" : "text-SHORT"}`}
          >
            $
            {data?.c.indexOf(".") !== -1 && Number(data?.c.indexOf(".")) >= 4
              ? Number(data?.c).toFixed(2)
              : Number(data?.c.indexOf(".")) >= 3
              ? Number(data?.c).toFixed(3)
              : Number(data?.c.indexOf(".")) >= 2
              ? Number(data?.c).toFixed(4)
              : Number(data?.c.indexOf(".")) >= 1 &&
                Number(data?.c).toFixed(5)}{" "}
            USDT
          </Typography>
          <Typography
            fontWeight={600}
            className={`${Number(data?.p) > 0 ? "text-LONG" : "text-SHORT"}`}
          >
            {Number(data?.P) > 0 ? `+${data?.P}%` : `${data?.P}%`}%
          </Typography>
        </Box>
      )}
    </Box>
  );
}
