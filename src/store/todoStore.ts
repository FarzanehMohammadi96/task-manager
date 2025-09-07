import { create } from "zustand";
import { Todo, TodoStore, TodoStatus } from "../types/todoTypes";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "@/services/todoApi";

export const useTodoStore = create<TodoStore>((set, get) => ({
  // Initial state
  todos: [],
  currentPage: 1,
  limit: 10,
  total: 0,
  loading: false,
  error: null,
  
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setTodos: (todos: Todo[]) => set({ todos }),
  setTotal: (total: number) => set({ total }),

  fetchTodos: async (currentPage = 1, limit = 10) => {
    set({ loading: true, error: null });

    try {
      const response = await fetchTodos(currentPage, limit);
      set({
        todos: response.todos,
        currentPage: response.currentPage,
        total: response.total,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch todos. Please try again.",
      });
    }
  },

  createTodo: async (payload: { title: string; description: string; status?: TodoStatus }) => {
    set({ loading: true, error: null });

    try {
      await createTodo(payload);
      set({ currentPage: 1 });
      await get().fetchTodos(1, get().limit);
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create new task. Please try again.",
      });
    }
  },

  updateTodo: async (
    id: string,
    updates: { title: string; description: string; status?: TodoStatus }
  ) => {
    set({ loading: true, error: null });

    try {
      const updated = await updateTodo(id, updates);
      const { todos } = get();

      const nextTodos = todos.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, ...updated } : todoItem
      );

      set({ todos: nextTodos, loading: false, error: null });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update task. Please try again.",
      });
    }
  },

  deleteTodo: async (id: string) => {
    set({ loading: true, error: null });

    try {
      await deleteTodo(id);
      const { todos, currentPage, limit, total } = get();
      const updatedTodos = todos.filter((todo) => todo.id !== id);

      set({
        todos: updatedTodos,
        total: total - 1,
        loading: false,
        error: null,
      });

      if (updatedTodos.length === 0 && currentPage > 1) {
        const newPage = currentPage - 1;
        set({ currentPage: newPage });
        get().fetchTodos(newPage, limit);
      }
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete task. Please try again.",
      });
    }
  },
}));
