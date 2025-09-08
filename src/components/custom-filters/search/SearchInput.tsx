import { FC, memo } from "react";
import styles from "@/styles/TasksList.module.scss";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
}

const SearchInputComponent: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search tasks by title...",
}) => {
  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export const SearchInput = memo(SearchInputComponent);
