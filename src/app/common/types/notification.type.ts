import * as z from 'zod'

export const MsgSchema = z.enum(['hello world'])
export type Msg = z.infer<typeof MsgSchema>

export const NotificationElementSchema = z.object({
    _id: z.string(),
    msg: MsgSchema,
    isReaded: z.boolean(),
    createdAt: z.coerce.date(),
    readedAt: z.coerce.date(),
    deletedAt: z.null(),
})
export type NotificationElement = z.infer<typeof NotificationElementSchema>

export const NotificationSchema = z.object({
    _id: z.string(),
    userId: z.string(),
    notifications: z.array(NotificationElementSchema),
})
export type Notification = z.infer<typeof NotificationSchema>
