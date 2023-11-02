"use client";

import { MouseEventHandler, useEffect, useRef } from "react";

import styles from "./backdrop.module.scss";

interface BackdropProps {
  additionalStyles?: string;
  children: JSX.Element | JSX.Element[];
  forLeftAside?: boolean;
  forTopAside?: boolean;
  isShown: boolean;
  hideBackdrop?: MouseEventHandler;
}

function Backdrop({
  children,
  forLeftAside,
  forTopAside,
  isShown,
  hideBackdrop,
}: BackdropProps) {
  const toggleButton = useRef<HTMLInputElement>();
  const backdrop = useRef<HTMLDivElement>();

  useEffect(() => {
    if (isShown === true) {
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
  }, [isShown]);

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
        defaultChecked={isShown}
      />
      {children}
      <div
        ref={backdrop}
        className={styles.backdrop}
        onClick={hideBackdrop}
      ></div>
    </>
  );
}

export default Backdrop;
