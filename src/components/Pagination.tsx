"use client";

import { useTodoStore } from "@/store/todoStore";
import { getPagination } from '@/utils/getPagination';
import styles from "../components/pagination/pagination.module.css";

export const Pagination = () => {
  const { currentPage, setCurrentPage, limit, total, loading } = useTodoStore();
  const totalPages = Math.ceil(total / limit);
  const pages = getPagination(currentPage, limit, total);

  if (loading || total === 0) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1 || loading}
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
                onClick={() => setCurrentPage(page as number)}
                disabled={loading}
              >
                {page}
              </button>
            )}
          </div>
        );
      })}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
      >
        بعدی
      </button>
    </div>
  );
};
