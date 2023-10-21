"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import styles from "./blackSail.module.scss";

interface BlackSailProps {
  additionalStyles?: string;
  children: JSX.Element | JSX.Element[];
  inputId: string;
  isChecked: boolean;
  setBlackSailIsShown: Dispatch<SetStateAction<boolean>>;
}

function BlackSail({
  additionalStyles,
  children,
  inputId,
  isChecked,
  setBlackSailIsShown,
}: BlackSailProps) {
  const toggleButton = useRef<HTMLInputElement>();
  const blackSail = useRef<HTMLDivElement>();

  useEffect(() => {
    if (isChecked === true) {
      blackSail.current.style.visibility = "visible";
      blackSail.current.style.transition = "all 0.5s ease-in-out";
      blackSail.current.style.opacity = "1";
    } else {
      blackSail.current.style.visibility = "hidden";
      blackSail.current.style.transition = "all 0.5s ease-in-out";
      blackSail.current.style.opacity = "0";
    }
  }, [isChecked]);

  return (
    <>
      <input
        ref={toggleButton}
        className={`${styles.blackSailCheckbox} ${additionalStyles}`}
        type="checkbox"
        id={inputId}
        name="black-sail"
        defaultChecked={isChecked}
      />
      {children}
      <div
        ref={blackSail}
        className={styles.blackSail}
        onClick={() => {
          setBlackSailIsShown(false);
        }}
      ></div>
    </>
  );
}

export default BlackSail;
