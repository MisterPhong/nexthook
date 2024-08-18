import * as z from 'zod'

export const SymbolSchema = z.object({
    symbol: z.string(),
    predictedPrice: z.number(),
})
export type Symbol = z.infer<typeof SymbolSchema>

export const PredictSchema = z.object({
    symbols: z.array(SymbolSchema),
})
export type Predict = z.infer<typeof PredictSchema>
