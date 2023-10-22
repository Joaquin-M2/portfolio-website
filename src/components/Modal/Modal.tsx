"use client";

import { Dispatch, SetStateAction } from "react";
import BlackSail from "../BlackSail/BlackSail";

import styles from "./modal.module.scss";

interface ModalProps {
  bottomButtons?: JSX.Element | JSX.Element[];
  children: JSX.Element | JSX.Element[];
  isShown: boolean;
  setModalIsShown: Dispatch<SetStateAction<boolean>>;
  title: string;
}

function Modal({
  bottomButtons,
  children,
  isShown,
  title,
  setModalIsShown,
}: ModalProps) {
  return (
    <>
      <BlackSail isChecked={isShown} setBlackSailIsShown={setModalIsShown}>
        <div
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-content"
          className={`${styles.container} ${
            isShown && styles.containerIsShown
          }`}
        >
          <h4 className={styles.title} id="modal-title">
            {title}
          </h4>
          <div className={styles.mainContent} id="modal-content">
            {children}
          </div>
          <div
            className={
              bottomButtons ? styles.bottomButtonsContainer : styles.displayNone
            }
          >
            {bottomButtons}
          </div>
        </div>
      </BlackSail>
    </>
  );
}

export default Modal;
