"use client";

import { Box, CssBaseline } from "@mui/material";

export default function Loading() {
  return (
    <Box>
      <CssBaseline />
      <div className="spinner"></div>
    </Box>
  );
}
