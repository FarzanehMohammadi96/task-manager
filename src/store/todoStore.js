import { create } from "zustand";

export const useTodoStore = create((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  fetchTodos: async () => {
    const res = await fetch("https://6166c3df13aa1d00170a66b9.mockapi.io/tasks");
    const data = await res.json();
    set({ todos: data });
  },
}));
