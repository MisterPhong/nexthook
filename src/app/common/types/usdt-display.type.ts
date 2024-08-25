import { z } from 'zod'

export const UsdtDisplaySchema = z.object({
    usdt: z.number().nullable(),
    message: z.string(),
})
export type UsdtDisplay = z.infer<typeof UsdtDisplaySchema>
