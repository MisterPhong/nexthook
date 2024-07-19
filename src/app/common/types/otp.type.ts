import * as z from "zod";


export const OtpSchema = z.object({
    "message": z.string(),
    "statusCode": z.number(),
});
export type Otp = z.infer<typeof OtpSchema>;
