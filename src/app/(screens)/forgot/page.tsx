import { routers } from '@/app/common/constant/path'
import ForgotForm from '@/app/components/form/ForgotForm'
import { Card, CardContent, Typography, Box, TextField, Button, styled } from '@mui/material'
import Link from 'next/link'

type Props = {}

export default function page({ }: Props) {
  return (
    <Card className="w-96 p-5">
      <CardContent>

        {/* <LogoContainer>
            <img
              alt="logo"
              src="https://www.nasa.gov/wp-content/uploads/2023/04/nasa-logo-web-rgb.png"
              style={{ width: '100px', height: 'auto' }} // Adjust the width and height as needed
            />
          </LogoContainer> */}
        <Typography variant="h6" align="center" gutterBottom>
          Forgot Your Password
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" paragraph>
          Enter your email address and we will send you instructions to reset your password.
        </Typography>
        <ForgotForm/>
        <Typography align="center" marginTop="16px">
          <Link href={routers.login} color="secondary">
            Back to Login
          </Link>
        </Typography>
        <Typography align="center" marginTop="32px" color="textSecondary">
          Don't have an account?{' '}
          <Link href={routers.signup} color="secondary">
            Sign Up
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}