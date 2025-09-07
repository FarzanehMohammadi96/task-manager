import { FC, memo } from "react";
import styles from "../styles/TodoList.module.scss";

interface EmptyStateProps {
  hasSearchQuery: boolean;
  hasFilter?: boolean;
  searchMessage?: string;
  filterMessage?: string;
  defaultMessage?: string;
  onClearSearch?: () => void;
  onClearFilter?: () => void;
}

const EmptyStateComponent: FC<EmptyStateProps> = ({
  hasSearchQuery,
  hasFilter = false,
  searchMessage = "No tasks match your search.",
  filterMessage = "No tasks match the selected filter.",
  defaultMessage = "No tasks found. Create a new task.",
  onClearSearch,
  onClearFilter,
}) => {
  const handleClearSearch = () => {
    if (onClearSearch) {
      onClearSearch();
    } else {
      window.location.reload();
    }
  };

  const handleClearFilter = () => {
    if (onClearFilter) {
      onClearFilter();
    } else {
      window.location.reload();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (hasSearchQuery) {
        handleClearSearch();
      } else if (hasFilter) {
        handleClearFilter();
      }
    }
  };

  const getMessage = () => {
    if (hasSearchQuery) return searchMessage;
    if (hasFilter) return filterMessage;
    return defaultMessage;
  };

  const showClearButton = hasSearchQuery || hasFilter;

  return (
    <div className={styles.emptyState}>
      <p>{getMessage()}</p>
      {showClearButton && (
        <div>
          <button
            className={`${styles.button} ${styles["button--clearSearch"]}`}
            onClick={hasSearchQuery ? handleClearSearch : handleClearFilter}
            onKeyDown={handleKeyDown}
            aria-label={hasSearchQuery ? "Clear search and show all tasks" : "Clear filter and show all tasks"}
            title={hasSearchQuery ? "Clear search (Enter or Space)" : "Clear filter (Enter or Space)"}
          >
            {hasSearchQuery ? "Clear search" : "Clear filter"}
          </button>
        </div>
      )}
    </div>
  );
};

export const EmptyState = memo(EmptyStateComponent);
