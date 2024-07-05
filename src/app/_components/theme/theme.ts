'use client'
import { Lato, Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

const roboto = Roboto({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette:{
    mode:'light',
    primary:{
      main:'#6600FF'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

export default theme