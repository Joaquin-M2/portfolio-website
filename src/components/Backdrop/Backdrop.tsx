"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import styles from "./backdrop.module.scss";

interface BackdropProps {
  additionalStyles?: string;
  children: JSX.Element | JSX.Element[];
  forLeftAside?: boolean;
  forTopAside?: boolean;
  isChecked: boolean;
  setBackdropIsShown?: Dispatch<SetStateAction<boolean>>;
}

function Backdrop({
  children,
  forLeftAside,
  forTopAside,
  isChecked,
  setBackdropIsShown,
}: BackdropProps) {
  const toggleButton = useRef<HTMLInputElement>();
  const backdrop = useRef<HTMLDivElement>();

  useEffect(() => {
    if (isChecked === true) {
      backdrop.current.style.visibility = "visible";
      backdrop.current.style.transition = "all 0.5s ease-in-out";
      backdrop.current.style.opacity = "1";
      toggleButton.current.checked = true;
    } else {
      backdrop.current.style.visibility = "hidden";
      backdrop.current.style.transition = "all 0.5s ease-in-out";
      backdrop.current.style.opacity = "0";
      toggleButton.current.checked = false;
    }
  }, [isChecked]);

  return (
    <>
      <input
        ref={toggleButton}
        className={`
        ${styles.backdropCheckbox} 
        ${forTopAside && styles.forTopAside} 
        ${forLeftAside && styles.forLeftAside}
        `}
        type="checkbox"
        name="black-sail"
        defaultChecked={isChecked}
      />
      {children}
      <div
        ref={backdrop}
        className={styles.backdrop}
        onClick={() => {
          setBackdropIsShown(false);
        }}
      ></div>
    </>
  );
}

export default Backdrop;
