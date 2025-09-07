export type TodoStatus = 'todo' | 'doing' | 'done';

export interface Todo {
  id: string;
  title: string;
  description: string;
  image: string;
  status?: TodoStatus;
}

export interface TodoStore {
  todos: Todo[];
  currentPage: number;
  limit: number;
  total: number;
  loading: boolean;
  error: string | null;
  setCurrentPage: (currentPage: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTodos: (todos: Todo[]) => void;
  setTotal: (total: number) => void;
  fetchTodos: (currentPage?: number, limit?: number) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, updates: { title: string; description: string; status?: TodoStatus }) => Promise<void>;
  createTodo: (payload: { title: string; description: string; status?: TodoStatus }) => Promise<void>;
}
