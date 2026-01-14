import { create } from "zustand";
import {
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  fetchTodos as fetchTodosRequest,
  updateTodo as updateTodoRequest
} from "@/lib/services/todos";
import { Todo } from "@/types/todo";

// Store shape: state fields + async actions in one place.
type TodoStore = {
  todos: Todo[];
  isFetching: boolean;
  hasHydrated: boolean;
  hydrate: (todos: Todo[]) => void;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string, completed: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
};

// Default values used to reset or bootstrap the store.
const initialState = {
  todos: [],
  isFetching: false,
  hasHydrated: false
};

// Zustand store: actions call set(...) directly (no reducers).
export const useTodoStore = create<TodoStore>((set) => ({
  ...initialState,

  // Hydrate store from SSR/initial data and mark as ready.
  hydrate: (todos) => set({ todos, hasHydrated: true }),

  // Load todos from the API.
  async fetchTodos() {
    set({ isFetching: true });
    try {
      const todos = await fetchTodosRequest();
      set({ todos, hasHydrated: true });
    } finally {
      set({ isFetching: false });
    }
  },

  // Create a new todo and prepend it in the list.
  async addTodo(title) {
    const newTodo = await createTodoRequest({ title });
    set((state) => ({
      todos: [newTodo, ...state.todos]
    }));
  },

  // Toggle completion status for a todo.
  async toggleTodo(id, completed) {
    const updated = await updateTodoRequest(id, { completed });
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? updated : todo))
    }));
  },

  // Remove a todo from the API and local list.
  async deleteTodo(id) {
    await deleteTodoRequest(id);
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id)
    }));
  },
}));
