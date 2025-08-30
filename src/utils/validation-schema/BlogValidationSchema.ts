import { z } from "zod";

export const createBlogValidationSchema = () => {
  return z.object({
    name: z
      .string("Name is required.")
      .min(2, { message: "Minimum 2 required" })
      .max(50, { message: "Maximum 50" }),
    description: z
      .string("Description is required")
      .min(20, { message: "Minimum 20 required." })
      .max(1000, "Description is 1000 maximum")
      .optional(),
  });
};
