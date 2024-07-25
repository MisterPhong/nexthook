import {
  AppBar as AppBars,
  Toolbar,
  Typography,
  Stack,
  Box
} from '@mui/material'
import { Avatars } from '../modules/Avatars'
import Menus from '../modules/Menus'

type Props = {}

export default function AppBar({ }: Props) {
  return (
    <AppBars position='static' sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography variant='h6' sx={{ mr: 2 }}>
            Landing Page
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
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
