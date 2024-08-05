import { routers } from '@/app/common/constant/path'
import ForgotForm from '@/app/components/form/ForgotForm'
import { Card, Link as LinkMui, CardContent, Typography, Box, TextField, Button, styled, Stack } from '@mui/material'
import Link from 'next/link'

type Props = {}

export default function page({ }: Props) {
  return (
    <Stack spacing={3}>
      <Card className="w-96 p-5">
        <CardContent>
          <Typography variant="h5" className="text-center">
            Logo
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            Forgot Your Password
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" paragraph>
            Enter your email address and we will send you instructions to reset your password.
          </Typography>
          <ForgotForm />
          <Typography align="center" marginTop="16px">
            <LinkMui component={Link} href={routers.login} fontWeight={600} fontSize={14}>
              Back to Login
            </LinkMui>
          </Typography>
        </CardContent>
      </Card>

      <Card elevation={3} className="w-96 p-3 flex justify-center gap-x-2">
        <Typography fontWeight={400}>
          Don't have an account?
        </Typography>
        <LinkMui
          component={Link}
          href={routers.signup}
          fontWeight={600}
          fontSize={14}
          className="mt-[1px]"
        >
          Sign Up
        </LinkMui>
      </Card>
    </Stack>

  )
}