'use client'

import Grid from "@mui/material/Grid";
import { CssBaseline, TextField, Button, Stack, Card, Typography, Checkbox, FormControlLabel, ThemeProvider } from "@mui/material";
import Image from "next/image";
import { createTheme } from "@mui/material/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios"
import { httpClient } from "./_components/services/httpClient";

export default function Home() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  return (
    <>
      <CssBaseline />
      <div className=" flex justify-center items-center min-h-screen">
        <Card className="w-[500px] p-6" >
          <Stack
            spacing={3}
            component={'form'}
            onSubmit={handleSubmit(async (data) => {
              console.log(data)
              const res = await httpClient.post('auth/signin/local', {
                "username": data.username,
                "password": data.password,
              })
              console.log(res.data)
            })}
          >
            <Typography variant="h3" className="text-center">LOGIN</Typography>
            <TextField id="text1" label="Username" variant="outlined" sx={{
              '& .MuiInputBase-root': {
                borderRadius: '10px 10px 10px 10px',
              },
            }} {...register('username')} />
            <TextField id="text2" label="Password" variant="outlined" sx={{
              '& .MuiInputBase-root': {
                borderRadius: '10px 10px 10px 10px',
              },
            }} {...register('password', { required: true })} />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />

            <Button variant="contained" color="success" type="submit" sx={{
              borderRadius: '10px 10px 10px 10px',
            }} >Login</Button>

          </Stack>
        </Card>
      </div>
    </>
  );
}
