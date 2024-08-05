import { z } from 'zod'

// export const CoinSchema = z.object({
//     e: z.string(),
//     E: z.number(),
//     s: z.string(),
//     k: z.object({
//         t: z.number(),
//         T: z.number(),
//         s: z.string(),
//         i: z.string(),
//         f: z.number(),
//         L: z.number(),
//         o: z.string(),
//         c: z.string(),
//         h: z.string(),
//         l: z.string(),
//         v: z.string(),
//         n: z.number(),
//         x: z.boolean(),
//         q: z.string(),
//         V: z.string(),
//         Q: z.string(),
//         B: z.string(),
//     }),
// })

// export type CoinType = z.infer<typeof CoinSchema>

export const CoinSchema = z.object({
    e: z.string(),
    E: z.number(),
    s: z.string(),
    p: z.string(),
    P: z.string(),
    w: z.string(),
    x: z.string(),
    c: z.string(),
    Q: z.string(),
    b: z.string(),
    B: z.string(),
    a: z.string(),
    A: z.string(),
    o: z.string(),
    h: z.string(),
    l: z.string(),
    v: z.string(),
    q: z.string(),
    O: z.number(),
    C: z.number(),
    F: z.number(),
    L: z.number(),
    n: z.number(),
})
export type Coin = z.infer<typeof CoinSchema>
