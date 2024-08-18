import * as z from 'zod'

export const NotificationElementSchema = z.object({
    _id: z.string(),
    msg: z.string(),
    isReaded: z.boolean(),
    createdAt: z.string().datetime(), // ใช้ string ที่เป็นรูปแบบ datetime
    readedAt: z.string().datetime().nullable(), // รองรับ null
    deletedAt: z.string().datetime().nullable(), // รองรับ null
})

export type NotificationElement = z.infer<typeof NotificationElementSchema>

export const NotificationSchema = z.object({
    _id: z.string(),
    userId: z.string(),
    notifications: z.array(NotificationElementSchema),
})
export type Notification = z.infer<typeof NotificationSchema>
