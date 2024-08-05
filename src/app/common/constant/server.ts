export const OK = 'OK'

export const wsUrl = process.env.NEXT_PUBLIC_WS_URL as string

export const server = {
    login: 'auth/signin/local',
    signup: 'auth/signup/local',
    otp: 'auth/confirm/otp',
    logout: 'auth/logout',
    profile: 'auth/profile',
    order: 'orders/create',
    query_order: 'orders/query',
    notification: 'notification',
    forgotPassword: 'auth/forgot-password',
    resetPassword: 'auth/reset-password',

}

export const social = {
    google: 'auth/google',
}
