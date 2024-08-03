import { Profile } from '@/app/components/modules/Avatars'
import { Stack, Card, CardContent, Button, Box } from '@mui/material'

export default function page() {
    return (
        <Card elevation={3}>
            <CardContent>
                <Stack
                    direction='row'
                    sx={{
                        alignContent: 'center',
                        justifyContent: 'space-between',
                        margin: 'normal',
                        marginY: 3,
                    }}
                >
                    <Profile />
                    <Box className='flex items-center'>
                        <Button
                            variant='outlined'
                            size='small'
                            sx={{
                                justifyContent: 'center',
                            }}
                        >
                            Edit
                        </Button>
                    </Box>
                </Stack>
                <div className='border-b border-border mb-4'>
                    <ul className='flex space-x-4'>
                        <li>
                            <a href='#' className='text-primary font-semibold'>
                                Key
                            </a>
                        </li>
                        <li>
                            <a href='#' className='text-muted-foreground'>
                                Seed phrase
                            </a>
                        </li>
                    </ul>
                </div>
                <p className='text-muted-foreground'>
                    Displaying 1 to 19 repositories
                </p>
                <div className='mt-4'>
                    <div className='flex items-center justify-between p-2 border border-border rounded-lg mb-2'>
                        <div>
                            <h3 className='font-semibold'>
                                taotoxicboy/zookeeper-exchange
                            </h3>
                            <p className='text-muted-foreground'>
                                By taotoxicboy · Updated 21 hours ago
                            </p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <span>7</span>
                            <span>·</span>
                            <span>0</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-between p-2 border border-border rounded-lg'>
                        <div>
                            <h3 className='font-semibold'>
                                taotoxicboy/zookeeper-auth-service
                            </h3>
                            <p className='text-muted-foreground'>
                                By taotoxicboy · Updated 21 hours ago
                            </p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <span>17</span>
                            <span>·</span>
                            <span>0</span>
                        </div>
                    </div>
                </div>
                {/* // </div > */}
            </CardContent>
        </Card>
    )
}
