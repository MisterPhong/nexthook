import {
  AppBar as AppBars,
  Toolbar,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { Avatars } from "../modules/Avatars";
import Menus from "../modules/Menus";
import Link from "next/link";
import { routers } from "@/app/common/constant/path";

type Props = {};

export default function AppBar({}: Props) {
  return (
    <AppBars
      position="static"
      sx={{ backgroundColor: "white", color: "black" }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography
            component={Link}
            href={routers.landing}
            variant="h6"
            sx={{ mr: 2 }}
          >
            Logo
          </Typography>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Menus />
          </Box>
        </Box>
        <Stack spacing={2} direction="row">
          <Avatars />
        </Stack>
      </Toolbar>
    </AppBars>
  );
}
