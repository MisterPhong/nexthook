import LoginForm from "@/app/_components/form/LoginForm"
import {
  CssBaseline,
  Card,
} from "@mui/material"
import React from "react"

export default function Home() {
  return (
    <>
      <CssBaseline />
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-[500px] p-6" elevation={5}>
          <LoginForm />
        </Card>
      </div>
    </>
  )
}
