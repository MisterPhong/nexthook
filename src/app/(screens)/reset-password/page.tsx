import { DontAccount } from '@/app/components/share/DontAccount'
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material'
import Image from 'next/image'

export default function page() {
    return (
        <Stack
            spacing={3}
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Card className='w-96 p-5' elevation={3}>
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: 2,
                        }}
                    >
                        <Image
                            alt='email-icon'
                            src='/mail/mailbox.svg'
                            width={150}
                            height={150}
                        />
                    </Box>
                    <Typography
                        variant='h6'
                        fontWeight={500}
                        fontSize={19}
                        align='center'
                    >
                        Check Your Email
                    </Typography>
                    <Typography align='center' paragraph color='textSecondary'>
                        Please check the email address
                    </Typography>
                    <Typography align='center' paragraph color='textSecondary'>
                        ppv_tao@outlook.co.th for instructions to reset your
                        password.
                    </Typography>
                    <Button
                        variant='outlined'
                        sx={{
                            marginX: 'auto',
                            justifyContent: 'center',
                            fontWeight: 300,
                            fontSize:16
                        }}
                        fullWidth
                    >
                        Resend email
                    </Button>
                </CardContent>
            </Card>
            <DontAccount />
        </Stack>
    )
}
