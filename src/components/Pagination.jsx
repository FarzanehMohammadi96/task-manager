"use client";

import { useTodoStore } from "@/store/todoStore";
import { GetPagination } from "@/utils/GetPagination";
import styles from "../components/pagination/pagination.module.css";

export const Pagination = () => {
  const { currentPage, setCurrentPage, limit, total } = useTodoStore();
  const totalPages = Math.ceil(total / limit);
  const pages = GetPagination();

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        قبلی
      </button>

      {pages.map((page, index) => {
        return (
          <div key={index}>
            {page === "..." ? (
              <span className={styles.dots}>...</span>
            ) : (
              <button
                className={page === currentPage ? styles.active : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )}
          </div>
        );
      })}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        بعدی
      </button>
    </div>
  );
};
