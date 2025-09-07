"use client";
import { FC } from "react";
import { TodoStatus } from "@/types/todoTypes";
import styles from "../styles/TodoList.module.scss";

interface StatusDisplayProps {
  status?: TodoStatus;
}

export const StatusDisplay: FC<StatusDisplayProps> = ({ status }) => {
  if (!status) {
    return null;
  }

  const getStatusText = (status: TodoStatus): string => {
    switch (status) {
      case 'todo':
        return 'Todo';
      case 'doing':
        return 'Doing';
      case 'done':
        return 'Done';
      default:
        return status;
    }
  };

  return (
    <span className={`${styles.status} ${styles[`status--${status}`]}`}>
      {getStatusText(status)}
    </span>
  );
};
