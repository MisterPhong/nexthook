import * as z from "zod"


export const ErrorResponseSchema = z.object({
    "message": z.string(),
    "statusCode": z.number(),
    "error": z.string(),
})
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>
