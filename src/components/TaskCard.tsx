"use client";
import { FC, useState, memo, useCallback } from "react";
import styles from "../styles/TodoList.module.scss";
import { useTodoStore } from "../store/todoStore";
import { Todo } from "@/types/todoTypes";
import { Form } from "./Form";
import { toast } from "react-toastify";
import Image from "next/image";

interface TaskCardProps {
  todo: Todo;
}

export const TaskCard: FC<TaskCardProps> = ({ todo }) => {
  const { updateTodo, deleteTodo, loading } = useTodoStore();
  const [editing, setEditing] = useState(false);

  const handleUpdate = useCallback(
    async (data: { title: string; description: string }) => {
      try {
        await updateTodo(todo.id, data);
        setEditing(false);
        toast.success("با موفقیت ویرایش شد");
      } catch (e) {
        const message = e instanceof Error ? e.message : "خطا در ویرایش تسک";
        toast.error(message);
      }
    },
    [updateTodo, todo.id]
  );

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    setEditing(false);
  }, []);

  const handleDeleteClick = useCallback(async () => {
    try {
      await deleteTodo(todo.id);
      toast.success("تسک با موفقیت حذف شد");
    } catch (e) {
      const message = e instanceof Error ? e.message : "خطا در حذف تسک";
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
      className={styles.card}
      aria-labelledby={`task-title-${todo.id}`}
      aria-describedby={`task-description-${todo.id}`}
      tabIndex={editing ? -1 : 0}
      onKeyDown={handleKeyDown}
      aria-label={`Task: ${todo.title}. ${todo.description}`}
    >
      <div className={styles["card__content"]}>
        {editing ? (
          <Form
            initialValues={{ title: todo.title, description: todo.description }}
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
                Title: <span>{todo.title}</span>
              </p>
              <p className={styles.bold}>
                Description: <span>{todo.description}</span>
              </p>
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
