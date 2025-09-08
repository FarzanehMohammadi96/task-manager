"use client";
import { UseFormRegister } from "react-hook-form";
import styles from "./RadioButton.module.scss";
import { TodoStatus } from "@/types/todoTypes";

interface FormValues {
  title: string;
  description: string;
  status?: TodoStatus;
}

interface RadioButtonProps {
  register: UseFormRegister<FormValues>;
  options: { id: string; value: string; label: string }[];
}

export const RadioButton = ({ register, options }: RadioButtonProps) => {
  return (
    <div className={styles.radioGroup}>
      <div className={styles.radioOption}>
        {options.map((option) => {
          return (
            <>
              <input
                type="radio"
                id={option.id}
                value={option.value}
                {...register("status")}
              />
              <label htmlFor="status-todo">{option.label}</label>
            </>
          );
        })}
      </div>
    </div>
  );
};
