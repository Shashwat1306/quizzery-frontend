import {z} from "zod";
 export const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  optionD: z.string().min(1, "Option D is required"),
  correct: z.enum(["A", "B", "C", "D"], { message: "Select the correct option" }),
});

