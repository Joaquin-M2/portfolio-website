"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import styles from "./blackSail.module.scss";

interface BlackSailProps {
  additionalStyles?: string;
  children: JSX.Element | JSX.Element[];
  forLeftAside?: boolean;
  forTopAside?: boolean;
  isChecked: boolean;
  setBlackSailIsShown?: Dispatch<SetStateAction<boolean>>;
}

function BlackSail({
  children,
  forLeftAside,
  forTopAside,
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
      toggleButton.current.checked = true;
    } else {
      blackSail.current.style.visibility = "hidden";
      blackSail.current.style.transition = "all 0.5s ease-in-out";
      blackSail.current.style.opacity = "0";
      toggleButton.current.checked = false;
    }
  }, [isChecked]);

  return (
    <>
      <input
        ref={toggleButton}
        className={`
        ${styles.blackSailCheckbox} 
        ${forTopAside && styles.forTopAside} 
        ${forLeftAside && styles.forLeftAside}
        `}
        type="checkbox"
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
