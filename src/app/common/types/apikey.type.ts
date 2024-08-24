import * as z from 'zod'

export const ApikeySchema = z.object({
    apiKey: z.string(),
    secretKey: z.string(),
})
export type Apikey = z.infer<typeof ApikeySchema>
