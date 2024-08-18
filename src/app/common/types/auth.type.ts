import * as z from 'zod'

export const AuthSchema = z.object({
    message: z.string(),
    statusCode: z.number(),
})
export type OK = z.infer<typeof AuthSchema>

export const EmailSchema = z.object({
    email: z.string(),
})
export type Email = z.infer<typeof EmailSchema>

export const SignupSchema = z.object({
    username: z
        .string()
        .min(6, { message: 'Username must be at least 6 characters long' }),
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, {
            message: 'Password must contain at least one uppercase letter',
        })
        .regex(/[a-z]/, {
            message: 'Password must contain at least one lowercase letter',
        })
        .regex(/[0-9]/, {
            message: 'Password must contain at least one number',
        })
        .regex(/[@$!%*?&#]/, {
            message: 'Password must contain at least one special character',
        }),
})
export type Signup = z.infer<typeof SignupSchema>

export const LoginSchema = z.object({
    username: z.string().nonempty({ message: 'Username is required' }),
    password: z.string().nonempty({ message: 'Password is required' }),
})
export type Login = z.infer<typeof LoginSchema>

export const ProfileSchema = z.object({
    userId: z.string(),
    username: z.string().nullable(),
    email: z.string(),
    picture: z.string().nullable(),
    name: z.string().nullable(),
})
export type Profile = z.infer<typeof ProfileSchema>

export const NewPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            })
            .regex(/[a-z]/, {
                message: 'Password must contain at least one lowercase letter',
            })
            .regex(/[0-9]/, {
                message: 'Password must contain at least one number',
            })
            .regex(/[@$!%*?&#]/, {
                message: 'Password must contain at least one special character',
            }),
        confirmPassword: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            })
            .regex(/[a-z]/, {
                message: 'Password must contain at least one lowercase letter',
            })
            .regex(/[0-9]/, {
                message: 'Password must contain at least one number',
            })
            .regex(/[@$!%*?&#]/, {
                message: 'Password must contain at least one special character',
            }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'], // Ensure this path matches the field you want to associate the error with
    })

export type NewPassword = z.infer<typeof NewPasswordSchema>

export const ResetPasswordSchema = z.object({
    token: z.string(),
    password: z.string(),
})
export type ResetPassword = z.infer<typeof ResetPasswordSchema>
