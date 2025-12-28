"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function createTodo(title: string) {
  await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  revalidatePath("/");
}

export async function updateTodo(
  id: string,
  data: { title?: string; completed?: boolean }
) {
  await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE"
  });

  revalidatePath("/");
}
