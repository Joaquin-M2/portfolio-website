"use client";

import styles from "./menuCard.module.scss";

interface MenuCardProps {
  children: JSX.Element | JSX.Element[];
  isVisible: boolean;
  position?: "bottom-left";
  [x: string]: any;
}

function MenuCard({ children, isVisible, position, ...props }: MenuCardProps) {
  return (
    <div
      className={`${styles.menuCard} ${isVisible && styles.menuCardIsVisible} ${
        position === "bottom-left" && styles.menuCardBottomLeft
      }`}
      {...props}
    >
      <ul className={styles.menuList}>{children}</ul>
    </div>
  );
}

export default MenuCard;
