"use client";
import { useEffect, useState } from "react";
import styles from "../styles/TodoList.module.scss";
import { useTodoStore } from "../store/todoStore";
import { Pagination } from "./Pagination";
import { LoadingSpinner } from "./loading/LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import { TaskCard } from "./TaskCard";
import { Form } from "./Form";
import { toast } from "react-toastify";
import { ThemeToggle } from "./theme/ThemeToggle";

export default function TodoList() {
  const { todos, fetchTodos, createTodo, currentPage, limit, loading, error } =
    useTodoStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTodos(currentPage, limit);
  }, [currentPage, limit, fetchTodos]);

  const handleCreate = async (data: { title: string; description: string }) => {
    try {
      await createTodo(data);
      setIsCreateOpen(false);
      toast.success("با موفقیت ایجاد شد");
    } catch (e) {
      const message = e instanceof Error ? e.message : "خطا در ایجاد تسک";
      toast.error(message);
    }
  };

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

  return (
    <div className={styles.container}>
      {!isCreateOpen ? (
        <div className={styles.actionsRowStart}>
               <ThemeToggle />
          <button
            className={`${styles.button} ${styles["button--createNew"]}`}
            onClick={() => setIsCreateOpen(true)}
          >
            <i className="fa-solid fa-plus"></i>
            <span style={{ marginLeft: "5px" }}> Create New Task</span>
          </button>
        </div>
      ) : (
        <div className={`${styles.card} ${styles["card--create"]}`}>
          <div className={styles["card__content"]}>
            <Form
              onSubmit={handleCreate}
              onCancel={() => setIsCreateOpen(false)}
              submitLabel="Create"
            />
          </div>
        </div>
      )}
      <input
        className={styles.input}
        placeholder="Search titles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search by title"
      />
      {filteredTodos.length === 0 ? (
        <div className={styles.emptyState}>
          <p>
            {searchQuery
              ? "No tasks match."
              : "No tasks found. Create a new task."}
          </p>
        </div>
      ) : (
        filteredTodos.map((todo) => <TaskCard key={todo.id} todo={todo} />)
      )}

      <Pagination />
    </div>
  );
}
