"use client";

import { create } from "zustand";
import { Todo } from "@/types/todo";
import {
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  fetchTodos as fetchTodosRequest,
  updateTodo as updateTodoRequest
} from "@/lib/services/todos";

type TodoStore = {
  todos: Todo[];
  isFetching: boolean;
  isMutating: boolean;
  error: string | null;
  hasHydrated: boolean;
  hydrate: (todos: Todo[]) => void;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string, completed: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  isFetching: false,
  isMutating: false,
  error: null,
  hasHydrated: false,
  hydrate: (todos) => set({ todos, hasHydrated: true, error: null }),

  async fetchTodos() {
    set({ isFetching: true, error: null });
    try {
      const todos = await fetchTodosRequest();
      set({ todos, hasHydrated: true, error: null });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch todos"
      });
    } finally {
      set({ isFetching: false });
    }
  },

  async addTodo(title) {
    set({ isMutating: true, error: null });
    try {
      const newTodo = await createTodoRequest({ title });
      set((state) => ({
        todos: [newTodo, ...state.todos]
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add todo"
      });
    } finally {
      set({ isMutating: false });
    }
  },

  async toggleTodo(id, completed) {
    set({ isMutating: true, error: null });
    try {
      const updated = await updateTodoRequest(id, { completed });

      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updated : todo))
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update todo"
      });
    } finally {
      set({ isMutating: false });
    }
  },

  async deleteTodo(id) {
    set({ isMutating: true, error: null });
    try {
      await deleteTodoRequest(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id)
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete todo"
      });
    } finally {
      set({ isMutating: false });
    }
  }
}));
