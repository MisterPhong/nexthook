import * as z from 'zod'

export const JwtPayloadSchema = z.object({
    exp: z.number(),
    iat: z.number(),
    sub: z.string(),
    username: z.string(),
})
export type JwtPayload = z.infer<typeof JwtPayloadSchema>
