import {z} from "zod";
export const registerSchema = z.object({
    email : z.string().min(1, "Email is required").email("Please enter a valid email"),
    password : z.string().min(8, "Password must be at least 8 characters long").max(20, "Password must not exceed 20 characters"),
    name : z.string().min(1, "Name is required").max(50, "Name must not exceed 50 characters")
});
export const loginSchema = z.object({
    email : z.string().min(1, "Email is required").email("Please enter a valid email"),
    password : z.string().min(8, "Password must be at least 8 characters long").max(20, "Password must not exceed 20 characters")
});
export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;