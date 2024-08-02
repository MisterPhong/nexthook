"use client";
import { Roboto } from "next/font/google";
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
    secondary: {
      main: "#6b6e78"
    },
    background: {
      default: "#fdfbff",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    caption: {
      color: "#757575",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: "#000000",
          borderColor: "#c9cace",
          fontWeight: 300,
          textTransform: "none",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        },
        contained: {
          textTransform: "none",
        },
        text: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
