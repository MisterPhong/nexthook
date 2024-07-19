import { Box, Button } from '@mui/material'
import { useFormStatus } from 'react-dom'
import theme from '../theme/theme'

type Props = {
  label: string
}

export function CustomButton({ label }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      variant='contained'
      type='submit'
      disabled={pending}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '10px',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      {pending ? <Box className="spinner"></Box> : label}
    </Button>
  )
}