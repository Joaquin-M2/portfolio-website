import { ChangeEvent } from "react";
import styles from "./FilterButton.module.scss";

interface FilterButtonProps {
  children: JSX.Element | JSX.Element[] | string;
  addAndRemoveFilter: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterButton({
  children,
  addAndRemoveFilter,
}: FilterButtonProps) {
  return (
    <li className={styles.listElement}>
      {children}
      <label className={styles.rocker}>
        <input type="checkbox" onChange={addAndRemoveFilter} />
        <span className={styles.switchLeft}>On</span>
        <span className={styles.switchRight}>Off</span>
      </label>
    </li>
  );
}
