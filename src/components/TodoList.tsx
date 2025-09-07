"use client";
import { useEffect, useState, useCallback } from "react";
import styles from "../styles/TodoList.module.scss";
import { useTodoStore } from "../store/todoStore";
import { TodoStatus } from "../types/todoTypes";
import { Pagination } from "./Pagination";
import { LoadingSpinner } from "./loading/LoadingSpinner";
import { ErrorMessage } from "./error-handling/ErrorMessage";
import { TaskCard } from "./TaskCard";
import { Form } from "./Form";
import { SearchInput } from "./SearchInput";
import { EmptyState } from "./EmptyState";
import { toast } from "react-toastify";

export default function TodoList() {
  const { todos, fetchTodos, createTodo, currentPage, limit, loading, error } =
    useTodoStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TodoStatus | "all"| "">("");

  useEffect(() => {
    fetchTodos(currentPage, limit);
  }, [currentPage, limit, fetchTodos]);

  const handleCreate = useCallback(
    async (data: {
      title: string;
      description: string;
      status?: TodoStatus;
    }) => {
      try {
        await createTodo(data);
        setIsCreateOpen(false);
        toast.success("با موفقیت ایجاد شد");
      } catch (e) {
        const message = e instanceof Error ? e.message : "خطا در ایجاد تسک";
        toast.error(message);
      }
    },
    [createTodo]
  );

  const handleCreateOpen = useCallback(() => {
    setIsCreateOpen(true);
  }, []);

  const handleCreateClose = useCallback(() => {
    setIsCreateOpen(false);
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading)
    return (
      <div className={styles.container}>
        <LoadingSpinner message="Loading tasks..." />
      </div>
    );
  if (error)
    return (
      <div className={styles.container}>
        <ErrorMessage error={error} />
      </div>
    );

  const filteredTodos = todos.filter((todo) => {
    // Filter by search query
    const matchesSearch =
      !searchQuery.trim() ||
      todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase());

    // Filter by status
    const matchesStatus =
      statusFilter === "all" || todo.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCreateKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCreateOpen();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleClearFilter = () => {
    setStatusFilter("");
  };

  return (
    <div className={styles.container} role="main" aria-label="Task Manager">
      <div className={styles.cardsActions}>
        <div className={styles.filterActionsRow}>
          <section>
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
          </section>

          <section>
               <select
                 id="status-filter"
                 className={styles.filterSelect}
                 value={statusFilter}
                 onChange={(e) =>
                   setStatusFilter(e.target.value as TodoStatus | "all")
                 }
                 aria-label="Filter tasks by status"
               >
                 <option value="" disabled>Filter by Status</option>
                 <option value="all">All Tasks</option>
                 <option value="todo">Todo</option>
                 <option value="doing">Doing</option>
                 <option value="done">Done</option>
               </select>
          </section>
        </div>

        <section>
          <button
            className={`${styles.button} ${styles["button--createNew"]}`}
            onClick={handleCreateOpen}
            onKeyDown={handleCreateKeyDown}
            aria-label="Create new task"
            title="Create new task (Enter or Space)"
          >
            <span>Create New Task</span>
          </button>
        </section>
      </div>

      {/* Create Form - Below filter/search row */}
      {isCreateOpen && (
        <div
          className={`${styles.card} ${styles["card--create"]}`}
          role="dialog"
          aria-labelledby="create-task-title"
        >
          <div className={styles["card__content"]}>
            <Form
              onSubmit={handleCreate}
              onCancel={handleCreateClose}
              submitLabel="Create"
            />
          </div>
        </div>
      )}

      {filteredTodos.length === 0 ? (
        <EmptyState
          hasSearchQuery={!!searchQuery.trim()}
          hasFilter={statusFilter !== "all"}
          onClearSearch={handleClearSearch}
          onClearFilter={handleClearFilter}
        />
      ) : (
        <>
          {filteredTodos.map((todo) => (
            <TaskCard key={todo.id} todo={todo} />
          ))}
          {!searchQuery.trim() && statusFilter === "all" && <Pagination />}
        </>
      )}
    </div>
  );
}
