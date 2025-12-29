"use server";

import { revalidatePath } from "next/cache";
import { createTodo as createTodoRequest, updateTodo as updateTodoRequest, deleteTodo as deleteTodoRequest } from "@/lib/services/todos";

export async function createTodo(title: string) {
  await createTodoRequest({ title });

  revalidatePath("/");
}

export async function updateTodo(
  id: string,
  data: { title?: string; completed?: boolean }
) {
  await updateTodoRequest(id, data);

  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  await deleteTodoRequest(id);

  revalidatePath("/");
}
