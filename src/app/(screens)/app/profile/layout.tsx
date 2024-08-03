import { Box } from "@mui/material";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'profile',
  description: 'profile page',
}

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box className="container mx-auto mt-5">
      {children}
    </Box>
  );
}
