"use client";

import { memo, useCallback } from "react";
import { useTodoStore } from "@/store/todoStore";
import { getPagination } from '@/utils/getPagination';
import styles from "../components/pagination/pagination.module.css";

const PaginationComponent = () => {
  const { currentPage, setCurrentPage, limit, total, loading } = useTodoStore();
  const totalPages = Math.ceil(total / limit);
  const pages = getPagination(currentPage, limit, total);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(currentPage - 1);
  }, [setCurrentPage, currentPage]);

  const handleNextPage = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [setCurrentPage, currentPage]);

  const handlePageClick = useCallback((page: number) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  if (loading || total === 0) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1 || loading}
      >
       Prev
      </button>

      {pages.map((page, index) => {
        return (
          <div key={index}>
            {page === "..." ? (
              <span className={styles.dots}>...</span>
            ) : (
              <button
                className={page === currentPage ? styles.active : ""}
                onClick={() => handlePageClick(page as number)}
                disabled={loading}
              >
                {page}
              </button>
            )}
          </div>
        );
      })}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages || loading}
      >
        Next
      </button>
    </div>
  );
};

export const Pagination = memo(PaginationComponent);
