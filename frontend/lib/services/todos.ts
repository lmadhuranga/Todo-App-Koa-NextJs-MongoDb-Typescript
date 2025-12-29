import { Todo } from "@/types/todo";
import { request } from "@/lib/httpClient";

type CreateTodoPayload = { title: string };
type UpdateTodoPayload = { title?: string; completed?: boolean };

export async function fetchTodos() {
  return request<Todo[]>("/todos");
}

export async function createTodo(payload: CreateTodoPayload) {
  return request<Todo>("/todos", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function updateTodo(id: string, payload: UpdateTodoPayload) {
  return request<Todo>(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}

export async function deleteTodo(id: string) {
  return request<void>(`/todos/${id}`, {
    method: "DELETE",
    skipJson: true
  });
}
