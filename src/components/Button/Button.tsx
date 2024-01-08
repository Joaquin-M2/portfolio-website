"use client";

import React from "react";

import styles from "./button.module.scss";

interface ButtonProps {
  children: JSX.Element | JSX.Element[] | string;
  disabled?: boolean;
  form?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  small?: boolean;
  type?: "button" | "submit" | "reset";
}

function Button({
  children,
  disabled,
  form,
  onClick,
  small,
  type = "button",
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${small && styles.small} ${
        disabled && styles.disabled
      }`}
      form={form}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
