'use client'
import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

const roboto = Roboto({
    weight: ['100', '300', '400', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
})

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6600FF',
            dark: '#001122',
        },
        secondary: {
            main: '#6b6e78',
        },
        background: {
            default: '#fdfbff',
            paper: '#fff',
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        caption: {
            color: '#757575',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,// สำหรับจอขนาดเล็ก (มือถือ)
            md: 1025, // สำหรับจอขนาดกลาง (แท็บเล็ต)// default 960px
            lg: 1280, // สำหรับจอขนาดใหญ่ (คอมพิวเตอร์)
            xl: 1920, // สำหรับจอขนาดใหญ่มาก (จอใหญ่)
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                outlined: {
                    color: '#000000',
                    borderColor: '#c9cace',
                    fontWeight: 300,
                    textTransform: 'none',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    '&:hover': {
                        backgroundColor: '#e5e5e5', // เปลี่ยนสีพื้นหลังเมื่อ hover
                        borderColor: '#c9cace', // เปลี่ยนสี border เมื่อ hover
                    },
                },
                contained: {
                    textTransform: 'none',
                },
                text: {
                    textTransform: 'none',
                },
            },
        },
    },
})

export default theme
