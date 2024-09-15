// 'use client'

// import { IoMdKey } from 'react-icons/io'
// import { routers } from '@/app/common/constant/path'
// import { Box, Typography, Skeleton, Button } from '@mui/material'
// import Link from 'next/link'
// import React, { Fragment } from 'react'

// type Props = {}

// export default function UsdtDisplay({}: Props) {
//     return (
//         <Fragment>
//             {isPending ? (
//                 <Skeleton variant='text' sx={{ fontSize: 14 }} width={133.79} />
//             ) : data?.usdt ? (
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <Typography
//                         variant='body1'
//                         color='primary'
//                         sx={{ fontWeight: 'bold' }}
//                         fontSize={14}
//                     >
//                         {parseFloat(data.usdt.toString()).toFixed(8)}
//                     </Typography>
//                     <Typography
//                         variant='caption'
//                         color='textSecondary'
//                         fontSize={12}
//                     >
//                         USDT
//                     </Typography>
//                 </Box>
//             ) : (
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Button
//                         variant='contained'
//                         LinkComponent={Link}
//                         href={routers.profile}
//                         size='small'
//                         startIcon={<IoMdKey style={{ marginRight: -4 }} />}
//                         sx={{
//                             p: 1.5,
//                             height: {
//                                 xs: 32,
//                             },
//                             fontSize: {
//                                 xs: 12,
//                                 sm: 14,
//                                 md: 16,
//                             },
//                         }}
//                     >
//                        Add API Key
//                     </Button>
//                 </Box>
//             )}
//         </Fragment>
//     )
// }
