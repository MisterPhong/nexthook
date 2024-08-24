import { Profile } from '@/app/components/modules/Avatars'
import { Stack, Card, CardContent, Button, Box } from '@mui/material'
import { Fragment } from 'react'
import TabProfile from '@/app/components/modules/TabProfile'

export default function page() {
    return (
        <Fragment>
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
                    <TabProfile />
                </CardContent>
            </Card>
        </Fragment>
    )
}
