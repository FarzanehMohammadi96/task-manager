"use client";
import { FC, useState, memo, useCallback } from "react";
import styles from "@/styles/TasksList.module.scss";

import { Todo, TodoStatus } from "@/types/todoTypes";

import { toast } from "react-toastify";
import Image from "next/image";
import { useTodoStore } from "@/store/todoStore";
import { Form } from "../Form";
import { StatusDisplay } from "../StatusDisplay";

interface TaskCardProps {
  todo: Todo;
  searchQuery?: string;
}
const highlightText = (text: string, query?: string) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} style={{ backgroundColor: "#f9e147ff" }}>
        {part}
      </mark>
    ) : (
      part
    )
  );
};

export const TaskCard: FC<TaskCardProps> = ({ todo, searchQuery }) => {
  const { updateTodo, deleteTodo, loading } = useTodoStore();
  const [editing, setEditing] = useState(false);

  const handleUpdate = useCallback(
    async (data: {
      title: string;
      description: string;
      status?: TodoStatus | null;
    }) => {
      try {
        await updateTodo(todo.id, data);
        setEditing(false);
        toast.success("Edited Successfully!");
      } catch (e) {
        const message = e instanceof Error ? e.message : "Error editing task!";
        toast.error(message);
      }
    },
    [updateTodo, todo.id]
  );

  const handleClearStatus = useCallback(async () => {
    await updateTodo(todo.id, {
      title: todo.title,
      description: todo.description,
      status: null,
    });
  }, [updateTodo, todo.id, todo.title, todo.description]);

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    setEditing(false);
  }, []);

  const handleDeleteClick = useCallback(async () => {
    try {
      await deleteTodo(todo.id);
      toast.success("Deleted Successfully!");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error Delete task ";
      toast.error(message);
    }
  }, [deleteTodo, todo.id]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (e.target === e.currentTarget) {
        handleEdit();
      }
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleEdit();
    }
  };

  const handleDeleteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleDeleteClick();
    }
  };

  return (
    <div
      className={`${styles.card} ${editing ? styles["card--editing"] : ""}`}
      aria-labelledby={`task-title-${todo.id}`}
      aria-describedby={`task-description-${todo.id}`}
      tabIndex={editing ? -1 : 0}
      onKeyDown={handleKeyDown}
      aria-label={`Task: ${todo.title}. ${todo.description}`}
    >
      <div className={styles["card__content"]}>
        {editing ? (
          <Form
            initialValues={{
              title: todo.title,
              description: todo.description,
              status: todo.status,
            }}
            onSubmit={handleUpdate}
            onCancel={handleCancel}
            submitting={loading}
            submitLabel="Edit"
          />
        ) : (
          <div className={styles.dataWrapper}>
            <div className={styles.imageWrapper}>
              {todo.image ? (
                <Image
                  src={todo.image}
                  alt={`Task image for ${todo.title}`}
                  style={{ objectFit: "cover" }}
                  sizes="60px"
                  width={100}
                  height={120}
                />
              ) : (
                <div
                  className={styles.placeholderImage}
                  aria-hidden="true"
                  role="presentation"
                >
                  <i className="fa fa-image" aria-hidden="true"></i>
                </div>
              )}
            </div>

            <div>
              <p className={styles.bold}>
                Title: <span>{highlightText(todo.title, searchQuery)}</span>
              </p>
              <p className={styles.bold}>
                Description: <span>{todo.description}</span>
              </p>
              <div style={{ marginTop: "8px" }}>
                <StatusDisplay
                  status={todo.status}
                  onClear={handleClearStatus}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {!editing && (
        <div className={styles.actionsRow}>
          <button
            className={`${styles.button} ${styles["button--edit"]}`}
            onClick={handleEdit}
            onKeyDown={handleEditKeyDown}
            disabled={loading}
            aria-label={`Edit task: ${todo.title}`}
            title="Edit task (Enter or Space)"
          >
            <i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>
          </button>
          <button
            className={`${styles.button} ${styles["button--delete"]}`}
            onClick={handleDeleteClick}
            onKeyDown={handleDeleteKeyDown}
            disabled={loading}
            aria-label={`Delete task: ${todo.title}`}
            title="Delete task (Enter or Space)"
          >
            <i className="fa-solid fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      )}
    </div>
  );
};
