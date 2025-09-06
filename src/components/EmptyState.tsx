import { FC, memo } from "react";
import styles from "../styles/TodoList.module.scss";

interface EmptyStateProps {
  hasSearchQuery: boolean;
  searchMessage?: string;
  defaultMessage?: string;
  onClearSearch?: () => void;
}

const EmptyStateComponent: FC<EmptyStateProps> = ({
  hasSearchQuery,
  searchMessage = "No tasks match your search.",
  defaultMessage = "No tasks found. Create a new task.",
  onClearSearch,
}) => {
  const handleClearSearch = () => {
    if (onClearSearch) {
      onClearSearch();
    } else {
      window.location.reload();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClearSearch();
    }
  };

  return (
    <div className={styles.emptyState}>
      <p>{hasSearchQuery ? searchMessage : defaultMessage}</p>
      {hasSearchQuery && (
        <div>
          <button
            className={`${styles.button} ${styles["button--clearSearch"]}`}
            onClick={handleClearSearch}
            onKeyDown={handleKeyDown}
            aria-label="Clear search and show all tasks"
            title="Clear search (Enter or Space)"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export const EmptyState = memo(EmptyStateComponent);
