"use client";

import { MouseEventHandler } from "react";
import Backdrop from "../Backdrop/Backdrop";

import styles from "./modal.module.scss";
import Button from "../Button/Button";

interface ModalProps {
  acceptButtonTitle?: string;
  cancelButtonTitle?: string;
  backendResponse?: { status: number; message: string };
  children: JSX.Element | JSX.Element[];
  isShown: boolean;
  hideModal: MouseEventHandler;
  targetForm?: string;
  title: string;
}

function Modal({
  acceptButtonTitle,
  cancelButtonTitle,
  backendResponse,
  children,
  isShown,
  hideModal,
  targetForm,
  title,
}: ModalProps) {
  return (
    <>
      <Backdrop isShown={isShown} hideBackdrop={hideModal}>
        <div
          role="dialog"
          aria-labelledby={`${targetForm}-modal-title`}
          aria-describedby={`${targetForm}-modal-description`}
          className={`${styles.container} ${
            isShown && styles.containerIsShown
          }`}
        >
          <h4 className={styles.title} id={`${targetForm}-modal-title`}>
            {title}
          </h4>

          <div
            className={styles.mainContent}
            id={`${targetForm}-modal-description`}
          >
            {children}
            {backendResponse && (
              <p
                className={`${styles.backendResponse} ${
                  backendResponse.status >= 400
                    ? styles.backendResponseError
                    : styles.backendResponseSuccess
                }`}
                role="alert"
              >
                {backendResponse.message}
              </p>
            )}
          </div>
          <div className={styles.bottomButtonsContainer}>
            <Button form={targetForm} type="submit" small>
              {acceptButtonTitle ? acceptButtonTitle : "Accept"}
            </Button>
            <Button form={targetForm} onClick={hideModal} type="reset" small>
              {cancelButtonTitle ? cancelButtonTitle : "Cancel"}
            </Button>
          </div>
        </div>
      </Backdrop>
    </>
  );
}

export default Modal;
