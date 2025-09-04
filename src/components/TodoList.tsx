"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/TodoList.module.scss";
import { useTodoStore } from "../store/todoStore";
import { Pagination } from "./Pagination";
import { LoadingSpinner } from "./loading/LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";

type FormValues = {
  title: string;
  description: string;
};

export default function TodoList() {
  const {
    todos,
    fetchTodos,
    deleteTodo,
    updateTodo,
    currentPage,
    limit,
    loading,
    error,
  } = useTodoStore();

  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  useEffect(() => {
    fetchTodos(currentPage, limit);
  }, [currentPage, limit, fetchTodos]);

  const onSubmit = async (data: FormValues) => {
    if (!editingId) return;
    await updateTodo(editingId, data);
    setEditingId(null);
    reset();
  };

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
              <div className={styles["card__content"]}>
                {editingId === todo.id ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <label className={styles.bold}>
                      Title:
                      <input
                        className={styles.input}
                        {...register("title", {
                          required: "Title is required",
                          minLength: {
                            value: 3,
                            message: "Title must be at least 3 characters",
                          },
                        })}
                        defaultValue={todo.title}
                        disabled={loading}
                      />
                    </label>
                    {errors.title && (
                      <p className={styles.error}>{errors.title.message}</p>
                    )}

                    <label className={styles.bold}>
                      Description:
                      <input
                        className={styles.input}
                        {...register("description")}
                        defaultValue={todo.description}
                        disabled={loading}
                      />
                    </label>

                    <div className={styles.actionsRow}>
                      <button
                        type="submit"
                        className={`${styles.button} ${styles["button--save"]}`}
                        disabled={loading || isSubmitting}
                        title="Save changes"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className={`${styles.button} ${styles["button--delete"]}`}
                        onClick={() => {
                          setEditingId(null);
                          reset();
                        }}
                        disabled={loading}
                        title="Cancel editing"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className={styles.bold}>
                      Title: <span>{todo.title}</span>
                    </p>
                    <p className={styles.bold}>
                      Description: <span>{todo.description}</span>
                    </p>
                    <p className={styles.bold}>
                      Image: <span>{todo.image}</span>
                    </p>
                  </>
                )}
              </div>

              {editingId !== todo.id && (
                <div className={styles.actionsRow}>
                  <button
                    className={`${styles.button} ${styles["button--edit"]}`}
                    onClick={() => {
                      setEditingId(todo.id);
                      reset({
                        title: todo.title,
                        description: todo.description,
                      });
                    }}
                    disabled={loading}
                    title="Edit task"
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.button} ${styles["button--delete"]}`}
                    onClick={() => deleteTodo(todo.id)}
                    disabled={loading}
                    title="Delete task"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
          <Pagination />
        </>
      )}
    </div>
  );
}
