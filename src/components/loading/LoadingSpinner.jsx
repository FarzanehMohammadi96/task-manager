"use client";

import styles from "./LoadingSpinner.module.scss";

export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingMessage}>{message}</p>
    </div>
  );
};
