import { z } from "zod";

export const submitSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1).max(100),
  content: z.string({ required_error: "Content is required" }),
  testCases: z
    .object({
      input: z.string({
        required_error: "Input and Output are required in test cases",
      }),
      output: z.string({
        required_error: "Input and Output are required in test cases",
      }),
    })
    .array(),
  userId: z.string({ required_error: "Unauthorized" }).min(1).max(100),
  admin: z
    .boolean({ required_error: "Only admins can submit a problem" })
    .refine((value) => value === true, {
      message: "Only admins can submit a problem",
    }),
});

export type submitType = z.infer<typeof submitSchema>;

export const listSchema = z.object({
  userId: z.string({ required_error: "Unauthorized" }).min(1).max(100),
});

export type listType = z.infer<typeof listSchema>;

export const getSchema = z.object({
  problemId: z
    .string({ required_error: "Problem ID is required" })
    .min(1)
    .max(100),
});

export type getType = z.infer<typeof getSchema>;
