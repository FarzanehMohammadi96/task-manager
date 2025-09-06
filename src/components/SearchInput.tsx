import { FC, memo, useState, useRef, useEffect } from "react";
import styles from "../styles/TodoList.module.scss";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  resultsCount?: number;
}

const SearchInputComponent: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search tasks...",
  resultsCount,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onChange("");
    } else if (e.key === "Tab" && e.shiftKey && value) {
      e.preventDefault();
    }
  };

  const resultsId = `search-results-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      aria-describedby={
        value && resultsCount !== undefined ? resultsId : undefined
      }
    />
  );
};

export const SearchInput = memo(SearchInputComponent);