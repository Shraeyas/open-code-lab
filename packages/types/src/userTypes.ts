import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email Address is required" })
    .email("Email Address is not valid")
    .min(1)
    .max(50),
  password: z
    .string({ required_error: "Password is required" })
    .min(1)
    .max(100),
});
export type loginType = z.infer<typeof loginSchema>;
export const signupSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1).max(50),
  email: z
    .string({ required_error: "Email Address is required" })
    .email("Email Address is not valid")
    .min(1)
    .max(50),
});
export type signupType = z.infer<typeof signupSchema>;
