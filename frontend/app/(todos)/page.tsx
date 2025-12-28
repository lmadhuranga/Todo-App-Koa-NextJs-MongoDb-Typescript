import { getTodos } from "@/lib/api";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          📝 ToDo App
        </h1>

        <TodoForm />
        <TodoList todos={todos} />
      </div>
    </main>
  );
}
