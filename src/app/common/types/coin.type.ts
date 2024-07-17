import { z } from 'zod'

export const CoinSchema = z.object({
    e: z.string(),
    E: z.number(),
    s: z.string(),
    k: z.object({
        t: z.number(),
        T: z.number(),
        s: z.string(),
        i: z.string(),
        f: z.number(),
        L: z.number(),
        o: z.string(),
        c: z.string(),
        h: z.string(),
        l: z.string(),
        v: z.string(),
        n: z.number(),
        x: z.boolean(),
        q: z.string(),
        V: z.string(),
        Q: z.string(),
        B: z.string(),
    }),
})

export type CoinType = z.infer<typeof CoinSchema>