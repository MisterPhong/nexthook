'use client'

import { Button } from "@mui/material"
import React from "react"
import Image from "next/image"
import { social } from "@/app/common/constant/server"

type Props = {
  label: string
  iconPath: string
}

export default function SocialButton({ label, iconPath }: Props) {
  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      color="secondary"
      startIcon={<Image src={iconPath} alt='Google' width={20} height={20} />}
      onClick={async () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}${social.google}`
      }}
    >
      {label}
    </Button>
  )
}