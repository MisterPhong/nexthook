import { AppBar as AppBars, Toolbar, Typography,Button } from "@mui/material";
import theme from "../theme/theme";
import Link from "next/link";


type Props = {}

export default function AppBar({}: Props) {
  return (
    <AppBars position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
    <Toolbar>
      <Typography variant="h6"  sx={{ flexGrow: 1 }}>
        Landing Page
      </Typography>
      <Button variant="contained" sx={{ marginRight: 2 }} >
        Sign Up
      </Button>
      <Link  
      href={"/login"}
      >
      LOGIN
      </Link>


      {/* <Button
    //   LinkComponent={"link"}
        variant="contained"
        color="primary" 
        // onClick={() => router.push('/login')}
        sx={{
          backgroundColor: 'white',
          color: theme.palette.primary.main,
          borderColor: 'black',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        Login
      </Button> */}
    </Toolbar>
  </AppBars>
  )
}