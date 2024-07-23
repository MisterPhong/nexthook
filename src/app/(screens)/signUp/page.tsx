'use client'
import {
  CssBaseline, 
  TextField,
   Button, 
   Stack, 
   Card,
    Typography,
     Checkbox,
      FormControlLabel
} from '@mui/material'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import React from 'react'
import { httpClient } from '../../_components/services/httpClient'

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()
  const [loginError, setLoginError] = React.useState(false)

  const onSubmit = async (data: any) => {
    console.log(data)
    // const res = await httpClient.post('auth/signin/local',{
    //   username: data.username,
    //   password: data.password
    // })
    // console.log(res.data)'

    if (data.username === 'test' && data.password === '123') {
      console.log('Okay!')
      router.push('/otp')
    } else {
      console.log('Wrong User')
      setLoginError(true) // Set login error state
    }
  }

  return (
    <>
      <CssBaseline />
      <div className='flex justify-center items-center min-h-screen'>
        <Card className='w-[500px] p-6' elevation={5}>
          <Stack
            spacing={3}
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant='h3' className='text-center'>Sign Up</Typography>
            <TextField
              id='text1'
              label='Username'
              variant='outlined'
              error={errors.username ? true : false} // Check if username has error
              helperText={errors.username ? 'Username is required' : ''}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '10px 10px 10px 10px',
                },
              }}
              {...register('username', { required: true })}
            />
            <TextField
              id='text2'
              label='Password'
              variant='outlined'
              error={errors.password ? true : false} // Check if password has error
              helperText={errors.password ? 'Password is required' : ''}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '10px 10px 10px 10px',
                },
              }}
              {...register('password', { required: true })}
            />
            <TextField
              id='text3'
              label='Email'
              variant='outlined'
              error={errors.email ? true : false} // Check if username has error
              helperText={errors.email ? 'Email is required' : ''}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '10px 10px 10px 10px',
                },
              }}
              {...register('username', { required: true })}
            />
            {loginError && (
              <Typography variant='body2' color='error'>
                Incorrect username or password.
              </Typography>
            )}

            <Button
              variant='contained'
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              type='submit'
            >
              Sign Up
            </Button>
            <Link href='/login'>You Have a Account? Login Now</Link>
          </Stack>
        </Card>
      </div>
    </>
  )
}
