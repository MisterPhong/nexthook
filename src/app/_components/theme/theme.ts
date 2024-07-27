"use client";
import { Lato, Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6600FF",
    },
    // text: {
    //   primary: "#757575",
    // },
    text: {
      primary: "#757575", // เพิ่มโค้ดสีใน text palette
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    // allVariants: {
    //   color: "#757575",
    // },
    caption: {
      color: "#757575",
    },
  },
});

export default theme;
