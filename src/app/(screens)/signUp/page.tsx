import { routers } from "@/app/common/constant/path";
import SignupForm from "@/app/components/form/SignupForm";
import OrDivider from "@/app/components/modules/OrDivider";
import { SocialButton } from "@/app/components/share/SocialButton";
import { Card, Stack, Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function page() {
  return (
    <Box className="w-full">
      <Stack className="max-w-md mx-auto" spacing={2}>
        <Typography variant="h5" className="text-center">
          Logo
        </Typography>
        <Typography variant="h5" className="text-center" fontWeight={600}>
          Create your account
        </Typography>
        <SignupForm />
        <OrDivider />
        <Stack spacing={1}>
          <SocialButton
            label="Continue with Google"
            iconPath="/socialLogin/google.svg"
          />
          {/* <SocialButton
            label="Continue with Facebook"
            iconPath="/socialLogin/facebook.svg"
          /> */}
        </Stack>
        <Button LinkComponent={Link} href={routers.login} variant="text">
          Alerady have an account? Sign in
        </Button>
      </Stack>
    </Box>
  );
}
