"use client";

import React from "react";

import styles from "./button.module.scss";

interface ButtonProps {
  children: JSX.Element | JSX.Element[] | string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  small?: boolean;
}

function Button({ children, onClick, small }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${small && styles.buttonSmall}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
