import { symbol } from "@/app/common/constant/symbols";
import { AnimationText } from "@/app/components/modules/AnimationText";
import { PriceLaning } from "@/app/components/modules/CoinInfo";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";

type Props = {};

export default async function page({}: Props) {
  return (
    <>
      {/* <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "65%",
          height: "100%",
          zIndex: -9,
        }}
      >
        <Image
          src={"/banner/banner.png"}
          alt="Banner"
          layout="fill"
          objectFit="cover"
        />
      </Box> */}
      <Box className="grid grid-cols-2 mt-10 max-w-screen-xl mx-auto">
        <Stack spacing={2} direction={"column"}>
          <AnimationText />
          <Stack direction={"row"} spacing={2}>
            <TextField label="Username" size="small" className="w-2/3" />
            <Button variant="contained" size="small" className="w-1/4">
              Sign Up
            </Button>
          </Stack>
        </Stack>
        <Card className="max-w-2xl mx-auto">
          <CardContent>
            {symbol.map((item) => (
              <Box key={item.symbol} className="grid grid-cols-4 w-96">
                <Stack
                  spacing={0.5}
                  direction={"row"}
                  className="items-center col-span-2"
                >
                  {item.icon}
                  <Typography fontWeight={600} className="flex items-center">
                    {item.nameShort}
                  </Typography>
                  <Typography
                    fontWeight={400}
                    className="flex"
                    variant="caption"
                  >
                    {item.nameLong}
                  </Typography>
                </Stack>
                <PriceLaning symbol={item.symbol} />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
