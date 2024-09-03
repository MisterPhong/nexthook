import { AppBar as AppBars, Toolbar, Stack, Box } from '@mui/material'
import { Avatars } from '../modules/Avatars'
import Image from 'next/image'
import Link from 'next/link'
import Menus from './Menus'
import { routers } from '@/app/common/constant/path'
import Sidebar from './Sidebar'

type Props = {}

export default function AppBar({}: Props) {
    return (
        <AppBars
            position='static'
            sx={{ backgroundColor: 'white', color: 'black' }}
        >
            <Toolbar>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
                >
                    <Box
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'block',
                            },
                        }}
                    >
                        <Link href={routers.root}>
                            <Image
                                alt='logo-icon'
                                src='/logo/Logo.svg'
                                width={30}
                                height={30}
                                style={{
                                    marginRight: 10,
                                }}
                            />
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            display: {
                            xs: 'block',
                            sm: 'none',
                            }
                        }}
                    >
                        <Sidebar />
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                        }}
                    >
                        <Menus />
                    </Box>
                </Box>
                <Stack spacing={2} direction='row'>
                    <Avatars />
                </Stack>
            </Toolbar>
        </AppBars>
    )
}
