import * as z from 'zod'

export const PositionFormSchema = z.object({
    symbol: z.string(),
    quantity: z.number(),
    timeframe: z.string(),
    type: z.string(),
    leverage: z.number(),
    ema: z.number().nullable().optional(),
    id: z.string().nullable().optional(),
    created_at: z.string().datetime().nullable().optional(),
    status: z.enum(['Long','Short']).nullable().optional()
})
export type PositionsForm = z.infer<typeof PositionFormSchema>

export const PositionSchema = z.object({
    symbol: z.string(),
    id: z.string().optional(),
    info: z.any(),
    timestamp: z.number().optional(),
    datetime: z.string().optional(),
    contracts: z.number().optional(),
    contractSize: z.number().optional(),
    side: z.string(),
    notional: z.number().optional(),
    leverage: z.number().optional(),
    unrealizedPnl: z.number().optional(),
    realizedPnl: z.number().optional(),
    collateral: z.number().optional(),
    entryPrice: z.number().optional(),
    markPrice: z.number().optional(),
    liquidationPrice: z.number().optional(),
    marginMode: z.string().optional(),
    hedged: z.boolean().optional(),
    maintenanceMargin: z.number().optional(),
    maintenanceMarginPercentage: z.number().optional(),
    initialMargin: z.number(),
    initialMarginPercentage: z.number().optional(),
    marginRatio: z.number().optional(),
    lastUpdateTimestamp: z.number().optional(),
    lastPrice: z.number().optional(),
    stopLossPrice: z.number().optional(),
    takeProfitPrice: z.number().optional(),
    percentage: z.number().optional(),
    type: z.string(),
    timeframe: z.string().optional(),
    ema: z.string().optional(),
    orderId: z.string(),
})

// Types for TypeScript
export type Position = z.infer<typeof PositionSchema>

// Positions schema
const PositionsSchema = z.union([
    z.object({
        message: z.array(PositionSchema),
    }),
    z.string(),
    z.object({
        message: z.string(),
    }),
])

// Types for TypeScript
export type Positions = z.infer<typeof PositionsSchema>
