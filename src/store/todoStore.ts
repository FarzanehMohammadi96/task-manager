import { create } from "zustand";
import { Todo, TodoStore } from "../types/todo";

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  currentPage: 1,
  limit: 10,
  total: 0,
  loading: false,
  error: null,
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  
  fetchTodos: async (currentPage = 1, limit = 10) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `https://6166c3df13aa1d00170a66b9.mockapi.io/tasks?page=${currentPage}&limit=${limit}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: Todo[] = await res.json();

      const paginationTotal = await fetch(
        `https://6166c3df13aa1d00170a66b9.mockapi.io/tasks`
      );

      if (!paginationTotal.ok) {
        throw new Error(`HTTP error! status: ${paginationTotal.status}`);
      }

      const allData: Todo[] = await paginationTotal.json();
      const totalCount = allData.length;

      set({
        todos: data,
        currentPage,
        total: totalCount,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch todos. Please try again.",
      });
    }
  },

  deleteTodo: async (id: string) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `https://6166c3df13aa1d00170a66b9.mockapi.io/tasks/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(`error status: ${res.status}`);
      }

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
      console.error("Error deleting:", error);
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete. Please try again.",
      });
    }
  },
}));
