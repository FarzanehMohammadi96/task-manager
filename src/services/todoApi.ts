import { Todo, TodoStatus } from "../types/todoTypes";

const BASE_URL = "https://68baa63184055bce63efb8ee.mockapi.io/tasks";

interface PaginatedResponse {
  todos: Todo[];
  total: number;
  currentPage: number;
  limit: number;
}


interface BaseTodoRequest {
  title: string;
  description: string;
  status?: TodoStatus;
}

type CreateTodoRequest = BaseTodoRequest
type UpdateTodoRequest = BaseTodoRequest

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function fetchTodos(
  currentPage: number = 1,
  limit: number = 10
): Promise<PaginatedResponse> {
  const allTodosResponse = await fetch(BASE_URL);
  const allTodos: Todo[] = await handleResponse(allTodosResponse);

  const sortedTodos = allTodos.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  const total = sortedTodos.length;
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const todos = sortedTodos.slice(startIndex, endIndex);

  return {
    todos,
    total,
    currentPage,
    limit,
  };
}

export async function createTodo(
  payload: CreateTodoRequest
): Promise<Todo> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: payload.title,
      description: payload.description,
      image: "",
      status: payload.status || null,
    }),
  });

  return await handleResponse<Todo>(response);
}

export async function updateTodo(
  id: string,
  updates: UpdateTodoRequest
): Promise<Todo> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  return await handleResponse<Todo>(response);
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}