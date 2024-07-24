import SignupForm from '@/app/_components/form/SignupForm'
import {
  CssBaseline,
  Card,
} from '@mui/material'

export default function Home() {
  // const { register, handleSubmit, formState: { errors } } = useForm()
  // const router = useRouter()
  // const [loginError, setLoginError] = useState(false)

  // const onSubmit = async (data: any) => {
  //   console.log(data)
  //   // const res = await httpClient.post('auth/signin/local',{
  //   //   username: data.username,
  //   //   password: data.password
  //   // })
  //   // console.log(res.data)

  //   if (data.username === 'test' && data.password === '123') {
  //     console.log('Okay!')
  //     router.push('/otp')
  //   } else {
  //     console.log('Wrong User')
  //     setLoginError(true) // Set login error state
  //   }
  // }

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
