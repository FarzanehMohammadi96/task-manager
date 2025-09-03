import { create } from "zustand";

export const useTodoStore = create((set) => ({
  todos: [],
  currentPage: 1,
  limit: 10,
  total: 0,
  setCurrentPage: (currentPage) => set({ currentPage }),
  fetchTodos: async (currentPage = 1, limit = 10) => {
    const res = await fetch(
      `https://6166c3df13aa1d00170a66b9.mockapi.io/tasks?page=${currentPage}&limit=${limit}`
    );
    const data = await res.json();

    const paginationTotal = await fetch(
      `https://6166c3df13aa1d00170a66b9.mockapi.io/tasks`
    );
    const allData = await paginationTotal.json();
    const totalCount = allData.length;

    set({ todos: data, currentPage, total: totalCount });
  },
}));
