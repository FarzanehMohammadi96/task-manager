"use client";

import { useEffect } from "react";
import styles from "../styles/TodoList.module.scss";
import { useTodoStore } from "../store/todoStore";
import { Pagination } from "./Pagination";
import { LoadingSpinner } from "./loading/LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import Image from "next/image";

export default function TodoList() {
  const { todos, fetchTodos, currentPage, limit, loading, error } =
    useTodoStore();

  useEffect(() => {
    fetchTodos(currentPage, limit);
  }, [currentPage, limit, fetchTodos]);

  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner message="Loading tasks..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <ErrorMessage error={error} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {todos.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No tasks found. Create a new task.</p>
        </div>
      ) : (
        <>
          {todos.map((todo) => (
            <div key={todo.id} className={styles.card}>
              <p className={styles.bold}>
                Title: <span>{todo.title}</span>
              </p>
              <p className={styles.bold}>
                Description: <span>{todo.description}</span>
              </p>
              {/* <Image
                src={todo.image}
                alt={`task ${todo.title} image `}
                width={50}
                height={50}
              /> */}
              <p className={styles.bold}>
                Image: <span>{todo.image}</span>
              </p>
            </div>
          ))}
          <Pagination />
        </>
      )}
    </div>
  );
}
