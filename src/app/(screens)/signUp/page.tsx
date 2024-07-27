import SignupForm from '@/app/_components/form/SignupForm'
import {
  CssBaseline,
  Card,
} from '@mui/material'

export default function Home() {
  return (
    <>
      <CssBaseline />
      <div className='flex justify-center items-center min-h-screen'>
        <Card className='w-[500px] p-6' elevation={5}>
          <SignupForm />
        </Card>
      </div>
    </>
  )
}
