import React from "react";
import { TodoStatus } from "@/types/todoTypes";

import styles from "./SelectFilter.module.scss";

interface Options {
  value: string;
  title: string;
}

type StatusFilter = TodoStatus | "all" | "";

interface SelectFilterProps {
  statusFilter: StatusFilter;
  setStatusFilter: React.Dispatch<React.SetStateAction<StatusFilter>>;
  options: Options[];
  hasDisabledOption: boolean;
  filterByName: string;
}

const SelectFilter = ({
  statusFilter,
  setStatusFilter,
  options,
  hasDisabledOption,
  filterByName,
}: SelectFilterProps) => {
  return (
    <div>
      {" "}
      <select
        id="status-filter"
        className={`${styles.filterSelect}`}
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as TodoStatus | "all")}
        aria-label="Filter tasks by status"
      >
        {hasDisabledOption ? (
          <option value="" disabled>
            Filter by {filterByName}
          </option>
        ) : (
          <></>
        )}
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectFilter;
