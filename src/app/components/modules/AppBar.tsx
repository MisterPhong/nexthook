import {
  AppBar as AppBars,
  Toolbar,
  Typography,
  Stack,
  Box,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Avatars } from "../modules/Avatars";
import Menus from "../modules/Menus";
import Link from "next/link";
import { routers } from "@/app/common/constant/path";
import Notification from "./Notification";

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
          {/* <Tooltip title="Open settings">
            <IconButton sx={{ p: 0 }}>
              <Avatar />
            </IconButton>
          </Tooltip> */}
        </Stack>
      </Toolbar>
    </AppBars>
  );
}
