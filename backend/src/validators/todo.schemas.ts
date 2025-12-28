import { z } from "zod";

const todoIdParamSchema = z.object({
  id: z.string().min(1),
});

const createTodoBodySchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
});

const updateTodoBodySchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").optional(),
    completed: z.boolean().optional(),
  })
  .refine((data) => data.title !== undefined || data.completed !== undefined, {
    message: "At least one field is required",
  });

export { todoIdParamSchema, createTodoBodySchema, updateTodoBodySchema };
