import * as z from "zod";

export const NotifySchema = z.object({
  id: z.string(),
  msg: z.string(),
  isRead: z.boolean(),
  createdAt: z.coerce.date(),
  readedAt: z.null(),
  deletedAt: z.null(),
  user_id: z.string(),
});
export type Notify = z.infer<typeof NotifySchema>;
