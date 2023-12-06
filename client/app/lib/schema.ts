import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email({
    message: "You must enter a valid email address.",
  }),
  password: z
    .string()
    .min(4, {
      message: "Your password must be between 4 and 20 characters.",
    })
    .max(20, {
      message: "Your password must be between 4 and 20 characters.",
    }),
});
