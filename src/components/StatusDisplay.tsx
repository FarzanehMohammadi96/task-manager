"use client";
import { FC } from "react";
import { TodoStatus } from "@/types/todoTypes";
import styles from "../styles/TasksList.module.scss";

interface StatusDisplayProps {
  status?: TodoStatus | null;
  onClear?: () => void;
}

export const StatusDisplay: FC<StatusDisplayProps> = ({ status, onClear }) => {
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
      {onClear ? (
        <button
          type="button"
          className={styles["status__close"]}
          onClick={(e) => { e.stopPropagation(); onClear(); }}
          aria-label="حذف وضعیت"
          title="حذف وضعیت"
        >
          ×
        </button>
      ) : null}
    </span>
  );
};

