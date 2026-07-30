import { z } from "zod";


export const volunteerSignupSchema = z.object({

   fullName: z
  .string()
  .trim()
  .min(1, "Full name is required")
  .min(3, "Full name must be at least 3 characters")
  .regex(
  /^[\u0600-\u06FF\sA-Za-z]+$/,
  "Full name must contain only letters"
),

    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email address"),



    verifyCode: z
        .string()
        .trim()
        .min(1, "Verification code is required"),



    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d).+$/,
            "Password must contain letters and numbers"
        ),



    confirmPassword: z
        .string()
        .min(1,"Please confirm your password")


})
.refine(
    (data)=>data.password === data.confirmPassword,
    {
        message:"Passwords do not match",
        path:["confirmPassword"]
    }
);