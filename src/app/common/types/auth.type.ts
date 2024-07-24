import * as z from "zod"


export const AuthSchema = z.object({
    "message": z.string(),
    "statusCode": z.number(),
})
export type OK = z.infer<typeof AuthSchema>

export const EmailSchema = z.object({
    "email": z.string(),
})
export type Email = z.infer<typeof EmailSchema>

export const SignupSchema = z.object({
    "username": z.string().min(6,{ message: "Username must be at least 6 characters long" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" }),
    "email": z.string().email(),
})
export type Signup = z.infer<typeof SignupSchema>

export const LoginSchema = z.object({
    "username": z.string(),
    "password": z.string(),
})
export type Login = z.infer<typeof LoginSchema>