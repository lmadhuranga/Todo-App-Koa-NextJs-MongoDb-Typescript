import { fetchTodos } from "@/lib/services/todos";

export async function getTodos() {
  return fetchTodos();
}
