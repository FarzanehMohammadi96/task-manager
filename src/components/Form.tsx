"use client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { TodoStatus } from "@/types/todoTypes";
import styles from "../styles/TodoList.module.scss";

interface FormValues {
  title: string;
  description: string;
  status?: TodoStatus;
}

interface TaskFormProps {
  initialValues?: FormValues;
  onSubmit: (data: FormValues) => Promise<void>;
  onCancel: () => void;
  submitting?: boolean;
  submitLabel?: string;
}

export const Form: FC<TaskFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  submitting,
  submitLabel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
      aria-label={`${submitLabel || "Create"} task form`}
      className={styles["task-form"]}
    >
      <label className={styles.bold}>
        Title:
        <input
          className={styles.input}
          {...register("title", {
            required: "Title is required",
            minLength: { value: 3, message: "At least 3 chars" },
          })}
          aria-describedby={errors.title ? "title-error" : undefined}
          aria-invalid={!!errors.title}
          disabled={submitting}
        />
      </label>
      {errors.title && <p className={styles.error}>{errors.title.message}</p>}

      <label className={styles.bold}>
        Description:
        <input
          className={styles.input}
          {...register("description", { required: "Description is required" })}
          disabled={submitting}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          aria-invalid={!!errors.description}
        />
      </label>
      {errors.description && (
        <p className={styles.error}>{errors.description.message}</p>
      )}

      <div className={styles.statusGroup}>
        <div className={styles.statusLabel}>Status (Optional):</div>
        <div className={styles.radioGroup}>
          <div className={styles.radioOption}>
            <input
              type="radio"
              id="status-todo"
              value="todo"
              {...register("status")}
              disabled={submitting}
            />
            <label htmlFor="status-todo">Todo</label>
          </div>
          <div className={styles.radioOption}>
            <input
              type="radio"
              id="status-doing"
              value="doing"
              {...register("status")}
              disabled={submitting}
            />
            <label htmlFor="status-doing">Doing</label>
          </div>
          <div className={styles.radioOption}>
            <input
              type="radio"
              id="status-done"
              value="done"
              {...register("status")}
              disabled={submitting}
            />
            <label htmlFor="status-done">Done</label>
          </div>
        </div>
      </div>

      <div className={styles.actionsRow}>
        <button
          type="submit"
          className={`${styles.button} ${
            submitLabel === "Edit"
              ? styles["button--editPrimary"]
              : styles["button--save"]
          }`}
          disabled={submitting}
        >
          {submitLabel}
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles["button--delete"]}`}
          onClick={onCancel}
          disabled={submitting}
          aria-label="Cancel and discard changes"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
