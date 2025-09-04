"use client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/TodoList.module.scss";

type FormValues = { title: string; description: string };

type TaskFormProps = {
  initialValues?: FormValues;
  onSubmit: (data: FormValues) => Promise<void>;
  onCancel: () => void;
  submitting?: boolean;
};

export const Form: FC<TaskFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  submitting,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["task-form"]}>
      <label className={styles.bold}>
        Title:
        <input
          className={styles.input}
          {...register("title", { required: "Title is required", minLength: { value: 3, message: "At least 3 chars" } })}
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
        />
      </label>
      {errors.description && <p className={styles.error}>{errors.description.message}</p>}

      <div className={styles.actionsRow}>
        <button type="submit" className={`${styles.button} ${styles["button--save"]}`} disabled={submitting}>
          Save
        </button>
        <button type="button" className={`${styles.button} ${styles["button--delete"]}`} onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
};
