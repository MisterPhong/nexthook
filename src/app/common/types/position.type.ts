import * as z from 'zod'

export const PositionSchema = z.object({
    symbol: z.string(),
    quantity: z.number(),
    timeframe: z.string(),
    type: z.string(),
    leverage: z.number(),
    ema: z.number(),
    id: z.string().nullable().optional(),
    created_at: z.string().datetime().nullable().optional(),
})
export type Position = z.infer<typeof PositionSchema>