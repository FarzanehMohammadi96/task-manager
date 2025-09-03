import { create } from "zustand";

export const useTodoStore = create((set, get) => ({
  todos: [],
  currentPage: 1,
  limit: 10,
  total: 0,
  loading: true,
  error: null,
  setCurrentPage: (currentPage) => set({ currentPage }),
  fetchTodos: async (currentPage = 1, limit = 10) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `https://6166c3df13aa1d00170a66b9.mockapi.io/tasks?page=${currentPage}&limit=${limit}`
      );

      if (!res.ok) {
        throw new Error(`error status: ${res.status}`);
      }

      const data = await res.json();

      const paginationTotal = await fetch(
        `https://6166c3df13aa1d00170a66b9.mockapi.io/tasks`
      );

      if (!paginationTotal.ok) {
        throw new Error(`error status: ${paginationTotal.status}`);
      }

      const allData = await paginationTotal.json();
      const totalCount = allData.length;

      set({
        todos: data,
        currentPage,
        total: totalCount,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching:", error);
      set({
        loading: false,
        error: error.message || "Failed to fetch",
      });
    }
  },
}));
