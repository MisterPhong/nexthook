"use client";

import { routers } from "@/app/common/constant/path";
import { useLogout } from "@/app/common/hooks/useLogout";
import { useProfile } from "@/app/common/hooks/useProfile";
import { profileSelector } from "@/app/common/store/slices/profileSlice";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import { Socket } from "dgram";
import { io } from "socket.io-client";

type Props = {};

const settings = ["Profile", "Account", "Logout"];

export function Avatars({ }: Props) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { mutate } = useLogout();
  const { isLoading } = useProfile();
  const profileReducer = useSelector(profileSelector);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleMenuItemClick = (setting: string) => {
    handleCloseUserMenu();
    if (setting === "Logout") {
      mutate();
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);

  return (
    <>
      {profileReducer.result ? (
        <Box sx={{ flexGrow: 0 }}>
          <Stack spacing={2} direction={'row'} >
            {/* column */}
            <Notification />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
          </Stack>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleMenuItemClick(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : (
        <>
          <Button
            variant="contained"
            LinkComponent={Link}
            href={routers.signup}
          >
            Sign Up
          </Button>
          <Button variant="text" LinkComponent={Link} href={routers.login}>
            Login
          </Button>
        </>
      )}
    </>
  );
}
