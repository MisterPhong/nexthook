import { Badge, Box } from "@mui/material";
import React from "react";
import MailIcon from '@mui/icons-material/Mail';

type Props = {};

export default function Notification({}: Props) {
  return (
    <Box>
      <Badge badgeContent={4} color="primary">
        <MailIcon color="action" />
      </Badge>
    </Box>
  );
}
