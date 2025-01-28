import { z, ZodObject } from "zod";

export const SignUpSchema: ZodObject<any, any> = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email("Invalid email format."),
  password: z
    .string({ required_error: "Password is required." })
    .min(6, "Password must be at least 6 characters long."),
  username: z
    .string({ required_error: "Username is required." })
    .min(3, "Username must be at least 3 characters long."),
  profilePic: z.string().url("Profile picture must be a valid URL.").optional()
});

export const LoginSchema: ZodObject<any, any> = z.object({
  usernameOrEmail: z.string({
    required_error: "Username or email is required."
  }),
  password: z.string().min(6, "Password must be at least 6 characters long.")
});
