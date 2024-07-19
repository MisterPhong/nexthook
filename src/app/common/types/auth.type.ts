import * as z from "zod";


export const AuthSchema = z.object({
    "message": z.string(),
    "statusCode": z.number(),
});
export type Auth = z.infer<typeof AuthSchema>;


export const EmailSchema = z.object({
    "email": z.string(),
});
export type Email = z.infer<typeof EmailSchema>;