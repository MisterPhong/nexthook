import * as z from 'zod'

export const PositionFormSchema = z.object({
    symbol: z.string(),
    quantity: z.number(),
    timeframe: z.string(),
    type: z.string(),
    leverage: z.number(),
    ema: z.number(),
    id: z.string().nullable().optional(),
    created_at: z.string().datetime().nullable().optional(),
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
    initialMargin: z.number().optional(),
    initialMarginPercentage: z.number().optional(),
    marginRatio: z.number().optional(),
    lastUpdateTimestamp: z.number().optional(),
    lastPrice: z.number().optional(),
    stopLossPrice: z.number().optional(),
    takeProfitPrice: z.number().optional(),
    percentage: z.number().optional(),
})

// Types for TypeScript
export type Position = z.infer<typeof PositionSchema>

// Positions schema
const PositionsSchema = z.union([
    z.object({
        message: z.array(PositionSchema),
    }),
    z.string(),
])

// Types for TypeScript
export type Positions = z.infer<typeof PositionsSchema>

// export interface Position {
//     symbol: string;
//     id?: any;
//     info: any;
//     timestamp?: number;
//     datetime?: string;
//     contracts?: number;
//     contractSize?: number;
//     side: any;
//     notional?: number;
//     leverage?: number;
//     unrealizedPnl?: number;
//     realizedPnl?: number;
//     collateral?: number;
//     entryPrice?: number;
//     markPrice?: number;
//     liquidationPrice?: number;
//     marginMode?: any;
//     hedged?: boolean;
//     maintenanceMargin?: number;
//     maintenanceMarginPercentage?: number;
//     initialMargin?: number;
//     initialMarginPercentage?: number;
//     marginRatio?: number;
//     lastUpdateTimestamp?: number;
//     lastPrice?: number;
//     stopLossPrice?: number;
//     takeProfitPrice?: number;
//     percentage?: number;
// }

// export type Positions = {
//     message: Position
// } | string