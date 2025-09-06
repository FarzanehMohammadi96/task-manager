"use client";

import styles from "./ErrorMessage.module.scss";

export const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className={styles.errorContainer}>
      <h3 className={styles.errorTitle}>Something went wrong. Try Again</h3>
      <p className={styles.errorMessage}>{error}</p>
    </div>
  );
};
