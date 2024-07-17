'use client';
import { AppBar, Toolbar, Typography, CssBaseline, Container, Button } from "@mui/material";
import theme from "./_components/theme/theme";
import { useRouter } from 'next/navigation'

export default function WithNavbar() {
  const router = useRouter()
  

  return (
    <>
      <CssBaseline />
     
      <Container>
        {/* Your content goes here */}
      </Container>
    </>
  );
}
