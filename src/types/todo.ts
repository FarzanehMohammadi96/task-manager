export interface Todo {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface TodoStore {
  todos: Todo[];
  currentPage: number;
  limit: number;
  total: number;
  loading: boolean;
  error: string | null;
  setCurrentPage: (currentPage: number) => void;
  fetchTodos: (currentPage?: number, limit?: number) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}
