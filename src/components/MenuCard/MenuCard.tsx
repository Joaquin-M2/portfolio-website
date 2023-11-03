"use client";

import styles from "./menuCard.module.scss";

interface MenuCardProps {
  children: JSX.Element | JSX.Element[];
  isVisible: boolean;
  position?: "bottom-left";
}

function MenuCard({ children, isVisible, position }: MenuCardProps) {
  return (
    <div
      className={`${styles.menuCard} ${isVisible && styles.menuCardIsVisible} ${
        position === "bottom-left" && styles.menuCardBottomLeft
      }`}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <ul className={styles.menuList}>{children}</ul>
    </div>
  );
}

export default MenuCard;
