import { AppBar as AppBars, Toolbar, Stack, Box } from '@mui/material'
import { Avatars } from '../modules/Avatars'
import Menus from '../modules/Menus'
import Image from 'next/image'
import Link from 'next/link'
import { routers } from '@/app/common/constant/path'

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
