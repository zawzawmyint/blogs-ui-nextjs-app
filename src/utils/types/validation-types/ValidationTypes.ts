import {
  createLoginValidationSchema,
  createRegisterValidationSchema,
} from "@/utils/validation-schema/AuthValidationSchema";
import { createBlogValidationSchema } from "@/utils/validation-schema/BlogValidationSchema";
import { z } from "zod";
// blog
export type BlogFormValues = z.infer<
  ReturnType<typeof createBlogValidationSchema>
>;
export type LoginFormValues = z.infer<
  ReturnType<typeof createLoginValidationSchema>
>;
export type RegisterFormValues = z.infer<
  ReturnType<typeof createRegisterValidationSchema>
>;
