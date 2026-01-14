import { getTodos } from "@/lib/api";
import TodosPageClient from "@/components/TodosPageClient";

export default async function TodosPage() {
  return (
    <main className="min-h-screen app-bg relative overflow-hidden px-4 py-12 flex items-center justify-center">
      <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-[rgba(96,140,230,0.18)] blur-2xl animate-floaty" />
      <div className="pointer-events-none absolute right-10 top-24 h-28 w-28 rounded-full bg-[rgba(255,123,87,0.22)] blur-2xl animate-floaty" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-32 w-32 rounded-full bg-[rgba(88,196,154,0.2)] blur-2xl animate-floaty" />

      <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 sm:p-8 animate-fade-up">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Focused day
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mt-2">
              📝 ToDo App
            </h1>
            <p className="text-sm text-slate-500 mt-2 max-w-md">
              Capture tasks, track progress, and stay calm with a clean, focused list.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <TodosPageClient />
        </div>
      </div>
    </main>
  );
}
