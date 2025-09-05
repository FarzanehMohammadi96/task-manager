"use client";
import { FC, useState } from "react";
import styles from "../styles/TodoList.module.scss";
import { useTodoStore } from "../store/todoStore";
import { Todo } from "@/types/todo";
import { Form } from "./Form";
import { toast } from "react-toastify";
import Image from "next/image";

type TaskCardProps = {
  todo: Todo;
};

export const TaskCard: FC<TaskCardProps> = ({ todo }) => {
  const { updateTodo, deleteTodo, loading } = useTodoStore();
  const [editing, setEditing] = useState(false);

  const handleUpdate = async (data: { title: string; description: string }) => {
    try {
      await updateTodo(todo.id, data);
      setEditing(false);
      toast.success("با موفقیت ویرایش شد");
    } catch (e) {
      const message = e instanceof Error ? e.message : "خطا در ویرایش تسک";
      toast.error(message);
    }
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
          <div className={styles.dataWrapper}>
            <div className={styles.imageWrapper}>
              <Image
                src={todo.image}
                alt=""
                style={{ objectFit: "cover" }}
                sizes="60px"
                width={100}
                height={120}
              />
            </div>

            <div>
              <p className={styles.bold}>
                Title: <span>{todo.title}</span>
              </p>
              <p className={styles.bold}>
                Description: <span>{todo.description}</span>
              </p>
              <p className={styles.bold}>
                Image: <span>{todo.image}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {!editing && (
        <div className={styles.actionsRow}>
          <button
            className={`${styles.button} ${styles["button--edit"]}`}
            onClick={() => setEditing(true)}
            disabled={loading}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            className={`${styles.button} ${styles["button--delete"]}`}
            onClick={async () => {
              try {
                await deleteTodo(todo.id);
              } catch (e) {
                const message =
                  e instanceof Error ? e.message : "خطا در حذف تسک";
                toast.error(message);
              }
            }}
            disabled={loading}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      )}
    </div>
  );
};
