"use client";
import { FC, useState } from "react";
import styles from "../styles/TodoList.module.scss";
import { useTodoStore } from "../store/todoStore";
import { Todo } from "@/types/todo";
import { Form } from "./Form";

type TaskCardProps = {
  todo: Todo;
};

export const TaskCard: FC<TaskCardProps> = ({ todo }) => {
  const { updateTodo, deleteTodo, loading } = useTodoStore();
  const [editing, setEditing] = useState(false);

  const handleUpdate = async (data: { title: string; description: string }) => {
    await updateTodo(todo.id, data);
    setEditing(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles["card__content"]}>
        {editing ? (
          <Form
            initialValues={{ title: todo.title, description: todo.description }}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
            submitting={loading}
            submitLabel="Edit"
          />
        ) : (
          <>
            <p className={styles.bold}>Title: <span>{todo.title}</span></p>
            <p className={styles.bold}>Description: <span>{todo.description}</span></p>
            <p className={styles.bold}>Image: <span>{todo.image}</span></p>
          </>
        )}
      </div>

      {!editing && (
        <div className={styles.actionsRow}>
          <button className={`${styles.button} ${styles["button--edit"]}`} onClick={() => setEditing(true)} disabled={loading}>
            Edit
          </button>
          <button className={`${styles.button} ${styles["button--delete"]}`} onClick={() => deleteTodo(todo.id)} disabled={loading}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
