import LoginForm from "@/app/components/form/LoginForm";
import {
  CssBaseline,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { Link as LinkMui } from "@mui/material";
import { routers } from "@/app/common/constant/path";
import OrDivider from "@/app/components/modules/OrDivider";
import { SocialButton } from "@/app/components/share/SocialButton";

export default async function page() {
  return (
    <Stack spacing={3} className="justify-center items-center min-h-screen">
      <Card className="w-96 p-5" elevation={3}>
        <CardContent>
          <Stack className="mb-5">
            <Typography variant="h5" className="text-center">
              Logo
            </Typography>
            <Typography variant="h5" className="text-center" fontWeight={600}>
              Sign In
            </Typography>
          </Stack>
          <LoginForm />
          <OrDivider />
          <Stack spacing={1}>
            <SocialButton
              label="Continue with Google"
              iconPath="/socialLogin/google.svg"
            />
          </Stack>
        </CardContent>
      </Card>
      <Card elevation={3} className="w-96 p-3 flex justify-center gap-x-2">
        <Typography variant="subtitle1" fontWeight={400}>
          Don't have an account?
        </Typography>
        <LinkMui component={Link} href={routers.signup} fontWeight={600}>
          Sign Up
        </LinkMui>
      </Card>
    </Stack>
  );
}