import { getTodos } from "@/lib/api";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <main>
      <h1>📝 ToDo App</h1>
      <TodoForm />
      <TodoList todos={todos} />
    </main>
  );
}