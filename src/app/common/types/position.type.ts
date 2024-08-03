import * as z from 'zod'

export const PositionSchema = z.object({
    symbol: z.string(),
    leverage: z.number(),
    quantity: z.number(),
    timeframe: z.string(),
    ema: z.number(),
})
export type Position = z.infer<typeof PositionSchema>

export const PositionResponseSchema = z.object({
    symbol: z.string(),
    quantity: z.number(),
    timeframe: z.string(),
    type: z.string(),
    leverage: z.number(),
    ema: z.number(),
    id: z.string(),
    created_at: z.coerce.date(),
})
export type PositionResponse = z.infer<typeof PositionResponseSchema>
