import * as z from "zod";


export const PositionSchema = z.enum([
    "Long",
    "Short",
]);
export type Position = z.infer<typeof PositionSchema>;

export const SymbolSchema = z.object({
    "symbol": z.string(),
    "actualPrice": z.number(),
    "predictedPrice": z.number(),
    "position": PositionSchema,
});
export type Symbol = z.infer<typeof SymbolSchema>;

export const PredictSchema = z.object({
    "date": z.string(),
    "symbols": z.array(SymbolSchema),
});
export type Predict = z.infer<typeof PredictSchema>;
