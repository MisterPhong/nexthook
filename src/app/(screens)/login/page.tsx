import {
  CssBaseline,
  TextField,
  Button,
  Stack,
  Card,
  Typography,
  Checkbox,
  FormControlLabel
} from "@mui/material"
import Link from 'next/link'
import { useForm } from "react-hook-form"
import theme from "../../_components/theme/theme"
import { useRouter } from 'next/navigation'
import React from "react"

export default function Home() {
  // const router = useRouter()
  // const [loginError, setLoginError] = React.useState(false)

  // const onSubmit = async (data: any) => {
  //   console.log(data)
  //   // const res = await httpClient.post("auth/signin/local",{
  //   //   username: data.username,
  //   //   password: data.password
  //   // })
  //   // console.log(res.data)

  //   if (data.username === "test" && data.password === "123") {
  //     console.log("Okay!")
  //     router.push('/otp')
  //   } else {
  //     console.log("Wrong User")
  //     setLoginError(true) // Set login error state
  //   }
  // }

  return (
    <>
      <CssBaseline />
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-[500px] p-6" elevation={5}>

        </Card>
      </div>
    </>
  )
}
