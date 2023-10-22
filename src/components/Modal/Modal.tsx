"use client";

import { Dispatch, SetStateAction } from "react";
import Backdrop from "../Backdrop/Backdrop";

import styles from "./modal.module.scss";

interface ModalProps {
  bottomButtons?: JSX.Element | JSX.Element[];
  children: JSX.Element | JSX.Element[];
  isShown: boolean;
  modalId: string;
  setModalIsShown: Dispatch<SetStateAction<boolean>>;
  title: string;
}

function Modal({
  bottomButtons,
  children,
  isShown,
  modalId,
  setModalIsShown,
  title,
}: ModalProps) {
  return (
    <>
      <Backdrop isChecked={isShown} setBackdropIsShown={setModalIsShown}>
        <div
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby={modalId}
          className={`${styles.container} ${
            isShown && styles.containerIsShown
          }`}
        >
          <h4 className={styles.title} id="modal-title">
            {title}
          </h4>
          <div className={styles.mainContent} id={modalId}>
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
      </Backdrop>
    </>
  );
}

export default Modal;
