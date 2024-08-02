import * as z from "zod";

export const ForgotSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter correct email format" }),
});
export type Forgot = z.infer<typeof ForgotSchema>;
