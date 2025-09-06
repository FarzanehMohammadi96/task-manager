"use client";
import { useEffect, useState, useCallback } from "react";
import styles from "../styles/TodoList.module.scss";
import { useTodoStore } from "../store/todoStore";
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

  useEffect(() => {
    fetchTodos(currentPage, limit);
  }, [currentPage, limit, fetchTodos]);

  const handleCreate = useCallback(
    async (data: { title: string; description: string }) => {
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

  const filteredTodos = searchQuery.trim()
    ? todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : todos;

  const handleCreateKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCreateOpen();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className={styles.container} role="main" aria-label="Task Manager">
      {!isCreateOpen ? (
        <div className={styles.actionsRowStart}>
          <button
            className={`${styles.button} ${styles["button--createNew"]}`}
            onClick={handleCreateOpen}
            onKeyDown={handleCreateKeyDown}
            aria-label="Create new task"
            title="Create new task (Enter or Space)"
          >
            <i className="fa-solid fa-plus" aria-hidden="true"></i>
            <span>Create New Task</span>
          </button>
        </div>
      ) : (
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
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      {filteredTodos.length === 0 ? (
        <EmptyState
          hasSearchQuery={!!searchQuery.trim()}
          onClearSearch={handleClearSearch}
        />
      ) : (
        <>
          {filteredTodos.map((todo) => (
            <TaskCard key={todo.id} todo={todo} />
          ))}
          {!searchQuery.trim() && <Pagination />}
        </>
      )}
    </div>
  );
}
