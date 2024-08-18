import './globals.css'
import { ThemeProvider } from '@mui/material'
import theme from './components/theme/theme'
import QueryProvider from './components/utilities/QueryProvider'
import StoreProvider from './components/utilities/StoreProvider'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz('2013-11-18T11:55:20', 'America/Toronto')

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <head>
                <link rel='icon' href='/logo/Logo.svg' type='image/svg+xml' />
            </head>
            <body>
                <main>
                    <StoreProvider>
                        <QueryProvider>
                            <ThemeProvider theme={theme}>
                                {children}
                            </ThemeProvider>
                        </QueryProvider>
                    </StoreProvider>
                </main>
            </body>
        </html>
    )
}
