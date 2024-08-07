// 'use client'
// import { Profile } from '@/app/components/modules/Avatars'
// import {
//     Stack,
//     Card,
//     CardContent,
//     Button,
//     Box,
//     Tab,
//     Divider,
//     Typography,
// } from '@mui/material'
// import { useState } from 'react'
// import { TabContext, TabList, TabPanel } from '@mui/lab'
// import { SiAwssecretsmanager } from 'react-icons/si'

// export default function page() {
//     const [value, setValue] = useState('1')

//     const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//         setValue(newValue)
//     }

//     return (
//         <Card elevation={3}>
//             <CardContent>
//                 <Stack
//                     direction='row'
//                     sx={{
//                         alignContent: 'center',
//                         justifyContent: 'space-between',
//                         margin: 'normal',
//                         marginY: 3,
//                     }}
//                 >
//                     <Profile />
//                     <Box className='flex items-center'>
//                         <Button
//                             variant='outlined'
//                             size='small'
//                             sx={{
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             Edit
//                         </Button>
//                     </Box>
//                 </Stack>
//                 <TabContext value={value}>
//                     <Divider />
//                     <Box>
//                         <TabList
//                             onChange={handleChange}
//                             aria-label='lab API tabs example'
//                         >
//                             <Tab
//                                 sx={{
//                                     fontSize: 12,
//                                     color:
//                                         value === '1' ? '#6600FF' : '#6b6e78',
//                                     fontWeight:
//                                         value === '1' ? 'bold' : 'normal',
//                                 }}
//                                 label='Secret'
//                                 value='1'
//                             />
//                         </TabList>
//                     </Box>
//                     <TabPanel value='1'>
//                         <Stack
//                             direction='column'
//                             spacing={2}
//                             alignItems='center'
//                             justifyContent='center'
//                             sx={{
//                                 height: '100%',
//                             }}
//                         >
//                             <SiAwssecretsmanager size={50} />
//                             <Typography
//                                 variant='h6'
//                                 fontWeight={600}
//                                 fontSize={20}
//                             >
//                                 You have not added the secret key and api key
//                                 yet.
//                             </Typography>
//                             <Button
//                                 sx={{
//                                     width: 'max-content',
//                                 }}
//                                 variant='contained'
//                             >
//                                 Add secret
//                             </Button>
//                         </Stack>
//                     </TabPanel>
//                     <TabPanel value='2'>Item Two</TabPanel>
//                 </TabContext>
//             </CardContent>
//         </Card>
//     )
// }

import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div>page</div>
  )
}