import * as z from 'zod'

export const NotificationSchema = z.object({
    _id: z.string(),
    msg: z.string(),
    isReaded: z.boolean(),
    createdAt: z.coerce.date(),
    readedAt: z.null(),
    deletedAt: z.null(),
    user_id: z.string(),
})
export type Notification = z.infer<typeof NotificationSchema>
