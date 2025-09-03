"use client";

import styles from "./LoadingSpinner.module.scss";

export const LoadingSpinner = ({
  message = "Loading...",
}: {
  message?: string;
}) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingMessage}>{message}</p>
    </div>
  );
};
