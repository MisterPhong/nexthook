import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <Box className="grid grid-cols-2 mt-10 max-w-screen-xl mx-auto">
      <Box>
        <Skeleton
          height={90}
          width={250}
          sx={{ marginBottom: -1 }}
          variant="text"
        />
        <Skeleton
          height={90}
          width={80}
          sx={{ marginBottom: -1 }}
          variant="text"
        />
        <Skeleton
          height={90}
          width={280}
          sx={{ marginBottom: -1 }}
          variant="text"
        />
        <Stack direction={"row"} spacing={2}>
          <Skeleton
            height={80}
            sx={{ marginBottom: -2 }}
            variant="text"
            className="w-2/3"
          />
          <Skeleton
            height={80}
            sx={{ marginBottom: -2 }}
            variant="text"
            className="w-1/4"
          />
        </Stack>
      </Box>
      <Card className="max-w-2xl mx-auto">
        <CardContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="mx-auto w-96" height={50} />
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
