export const wsUrl = process.env.NEXT_PUBLIC_WS_URL as string

export const server = {
    login: 'auth/signin/local',
    signup: 'auth/signup/local',
    otp: 'auth/confirm/otp',
    logout: 'auth/logout',
    profile: 'auth/profile',
    position: 'orders/query',
    notification: 'notification',
    forgotPassword: 'auth/forgot-password',
    resetPassword: 'auth/reset-password',
    createPosition: 'orders/create',
    predict: 'predict',
}

export const social = {
    google: 'auth/google',
}
