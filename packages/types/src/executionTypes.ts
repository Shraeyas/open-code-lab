import { z } from "zod";
export const executionSchema = z.object({
  src: z.string({ required_error: "Source code is required" }).min(1),
  lang: z.string({ required_error: "Language is required" }),
  input: z.optional(z.string().max(10000, "Input value too big")),
  user: z.optional(z.number()),
});
export type problemExecutionType = z.infer<typeof executionSchema>;
export const executionStatusSchema = z.object({
  id: z.string({ required_error: "Problem ID is required" }).min(1).max(100),
});
export type executionStatusType = z.infer<typeof executionStatusSchema>;
