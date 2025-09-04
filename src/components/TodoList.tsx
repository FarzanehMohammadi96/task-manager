"use client";
import { useEffect, useState } from "react";
import styles from "../styles/TodoList.module.scss";
import { useTodoStore } from "../store/todoStore";
import { Pagination } from "./Pagination";
import { LoadingSpinner } from "./loading/LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import { TaskCard } from "./TaskCard";
import { Form } from "./Form";

export default function TodoList() {
  const { todos, fetchTodos, createTodo, currentPage, limit, loading, error } = useTodoStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    fetchTodos(currentPage, limit);
  }, [currentPage, limit, fetchTodos]);

  const handleCreate = async (data: { title: string; description: string }) => {
    await createTodo(data);
    setIsCreateOpen(false);
  };

  if (loading) return <div className={styles.container}><LoadingSpinner message="Loading tasks..." /></div>;
  if (error) return <div className={styles.container}><ErrorMessage error={error} /></div>;

  return (
    <div className={styles.container}>
      {!isCreateOpen ? (
        <div className={styles.actionsRowStart}>
          <button
            className={`${styles.button} ${styles["button--createNew"]}`}
            onClick={() => setIsCreateOpen(true)}
          >
            Create New Task
          </button>
        </div>
      ) : (
        <div className={`${styles.card} ${styles["card--create"]}`}>
          <div className={styles["card__content"]}>
            <Form
              onSubmit={handleCreate}
              onCancel={() => setIsCreateOpen(false)}
            />
          </div>
        </div>
      )}

      {todos.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No tasks found. Create a new task.</p>
        </div>
      ) : (
        todos.map((todo) => <TaskCard key={todo.id} todo={todo} />)
      )}

      <Pagination />
    </div>
  );
}
