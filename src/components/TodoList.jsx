"use client";

import { useEffect } from "react";
import styles from "../styles/TodoList.module.scss";
import { useTodoStore } from "../store/todoStore";

export default function TodoList() {
  const { todos, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className={styles.container}>
      {todos.map((todo) => (
        <div key={todo.id} className={styles.card}>
          <p className={styles.bold}>
            Title:
            <span> {todo.title}</span>
          </p>
          <p className={styles.bold}>
            Description:
            <span> {todo.description}</span>
          </p>
          <p className={styles.bold}>
            Image:
            <span> {todo.image}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
