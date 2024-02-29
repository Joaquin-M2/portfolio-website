"use client";

import React from "react";

import styles from "./button.module.scss";

interface ButtonProps {
  children: JSX.Element | JSX.Element[] | string;
  disabled?: boolean;
  form?: string;
  increasedBorderRadiusPosition?: string;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  small?: boolean;
  type?: "button" | "submit" | "reset";
}

function Button({
  children,
  disabled,
  form,
  increasedBorderRadiusPosition,
  isActive,
  onClick,
  small,
  type = "button",
}: ButtonProps) {
  let increasedBorderRadiusPositionStyles = "";

  switch (increasedBorderRadiusPosition) {
    case "top-left":
      increasedBorderRadiusPositionStyles = styles.increasedBorderRadiusTopLeft;
      break;
    case "top-right":
      increasedBorderRadiusPositionStyles =
        styles.increasedBorderRadiusTopRight;
      break;
    case "bottom-left":
      increasedBorderRadiusPositionStyles =
        styles.increasedBorderRadiusBottomLeft;
      break;
    case "bottom-right":
      increasedBorderRadiusPositionStyles =
        styles.increasedBorderRadiusBottomRight;
      break;
  }

  return (
    <button
      className={`${styles.button} ${small && styles.small} ${
        disabled && styles.disabled
      } ${
        isActive ? styles.active : ""
      } ${increasedBorderRadiusPositionStyles}`}
      form={form}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
