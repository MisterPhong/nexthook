// 'use client'
// import { Fragment } from 'react'
// import theme from '../theme/theme'
// import { useSelector } from 'react-redux'
// import {
//     useMediaQuery,
//     Dialog,
//     DialogContent,
//     Box,
//     Button,
//     DialogActions,
//     DialogTitle,
//     Typography,
// } from '@mui/material'
// import Lottie from 'react-lottie'
// import * as animationData from '../../../../public/animetion/Animation - 1723215780655.json'
// import OtpForm from '../form/OtpForm'
// import { emailSelector } from '@/app/common/store/slices/emailSlice'

// type Props = {
//     handleClose: () => void
//     open: boolean
// }

// export default function ResponsiveDialog({ handleClose, open }: Props) {
//     const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
//     const emailReducer = useSelector(emailSelector)

//     return (
//         <Fragment>
//             <Dialog
//                 fullScreen={fullScreen}
//                 open={open}
//                 aria-labelledby='responsive-dialog-title'
//                 PaperProps={{
//                     sx: {
//                         width: '500px', // กำหนดความกว้าง
//                         maxWidth: '90%', // กำหนด max-width เป็นเปอร์เซ็นต์ของหน้าจอ
//                         height: '350px',
//                     },
//                 }}
//             >
//                 {emailReducer.load ? (
//                     <DialogContent>
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 height: '100%', // ทำให้สูงเต็มพื้นที่ DialogContent
//                             }}
//                         >
//                             <div className='spinner'></div>
//                         </Box>
//                     </DialogContent>
//                 ) : (
//                     <Fragment>
//                         <DialogTitle id='responsive-dialog-title'>
//                             <Lottie
//                                 options={{
//                                     loop: true,
//                                     autoplay: true,
//                                     animationData,
//                                     rendererSettings: {
//                                         preserveAspectRatio: 'xMidYMid slice',
//                                     },
//                                 }}
//                                 height={100}
//                                 width={100}
//                             />
//                             <Typography
//                                 variant='body2'
//                                 color='textSecondary'
//                                 align='center'
//                                 paragraph
//                                 fontSize={16}
//                             >
//                                 {`We've sent a verification code (OTP) to your email address ${
//                                     emailReducer.email!.slice(0, 2) +
//                                     '******' +
//                                     emailReducer.email!.slice(
//                                         emailReducer.email!.indexOf('@'),
//                                     )
//                                 }. Please check your inbox and enter the code below.`}
//                             </Typography>
//                         </DialogTitle>
//                         <DialogContent>
//                             <OtpForm />
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={handleClose}>
//                                 Close
//                             </Button>
//                         </DialogActions>
//                     </Fragment>
//                 )}
//             </Dialog>
//         </Fragment>
//     )
// }


'use client'
import { Fragment } from 'react'
import theme from '../theme/theme'
import { useSelector } from 'react-redux'
import {
    useMediaQuery,
    Dialog,
    DialogContent,
    Box,
    Button,
    DialogActions,
    DialogTitle,
    Typography,
} from '@mui/material'
import Lottie from 'react-lottie'
import * as animationData from '../../../../public/animetion/Animation - 1723215780655.json'
import OtpForm from '../form/OtpForm'
import { emailSelector } from '@/app/common/store/slices/emailSlice'

type Props = {
    handleClose: () => void
    open: boolean
}

export default function ResponsiveDialog({ handleClose, open }: Props) {
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const emailReducer = useSelector(emailSelector)

    return (
        <Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                aria-labelledby='responsive-dialog-title'
                PaperProps={{
                    sx: {
                        width: '500px',
                        maxWidth: '90%',
                        height: '350px',
                    },
                }}
            >
                {emailReducer.load ? (
                    <DialogContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        >
                            <div className='spinner'></div>
                        </Box>
                    </DialogContent>
                ) : (
                    <Fragment>
                        <DialogTitle id='responsive-dialog-title'>
                            <Lottie
                                options={{
                                    loop: true,
                                    autoplay: true,
                                    animationData,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice',
                                    },
                                }}
                                height={100}
                                width={100}
                            />
                            <Typography
                                variant='body2'
                                color='textSecondary'
                                align='center'
                                paragraph
                                fontSize={16}
                            >
                                {`We've sent a verification code (OTP) to your email address ${
                                    emailReducer.email!.slice(0, 2) +
                                    '******' +
                                    emailReducer.email!.slice(
                                        emailReducer.email!.indexOf('@'),
                                    )
                                }. Please check your inbox and enter the code below.`}
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <OtpForm />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>
                                Close
                            </Button>
                        </DialogActions>
                    </Fragment>
                )}
            </Dialog>
        </Fragment>
    )
}
