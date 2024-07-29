import { Button } from "@mui/material";
import React from "react";
import Image from "next/image";

type Props = {
  label: string;
  iconPath: string;
};

export default function SocialButton({ label, iconPath }: Props) {
  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      color="secondary"
      // className="flex justify-start"
      startIcon={<Image src={iconPath} alt="Google" width={20} height={20} />}
    >
      {label}
    </Button>
  );
}