import {
  AppBar as AppBars,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box
} from '@mui/material'
import { ButtonLogin } from '../modules/ButtonLogin'

type Props = {}

const pages = ['Products', 'Pricing', 'Blog']

export default function AppBar({ }: Props) {
  return (
    <AppBars position='static' sx={{ backgroundColor: 'white', color: 'black' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography variant='h6' sx={{ mr: 2 }}>
            Landing Page
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Box>
        <Stack spacing={2} direction='row'>
          <ButtonLogin />
        </Stack>
      </Toolbar>
    </AppBars>
  )
}
