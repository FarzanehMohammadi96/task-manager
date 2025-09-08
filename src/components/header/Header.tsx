"use client";
import Image from "next/image";
import { ThemeToggle } from "../theme/ThemeToggle";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
    <div className={styles.header}>
      <div  className={styles.logoTitle}>
        <Image src={logo} alt="" width={40} height={40} />
        <p>Task Manager</p>
      </div>
      <ThemeToggle />
    </div>
    </div>
  );
};

export default Header;
