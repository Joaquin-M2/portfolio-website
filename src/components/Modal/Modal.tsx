"use client";

import { MouseEventHandler } from "react";

import Backdrop from "@/components/Backdrop/Backdrop";
import Button from "@/components/Button/Button";

import styles from "./modal.module.scss";

interface ModalProps {
  acceptButtonIsDisabled?: boolean;
  acceptButtonTitle?: string;
  backendResponse?: { status: number; message: string };
  cancelButtonTitle?: string;
  children: JSX.Element | JSX.Element[];
  hideModal: MouseEventHandler;
  isShown: boolean;
  requestIsSuccessful?: boolean;
  targetForm?: string;
  title: string;
}

function Modal({
  acceptButtonIsDisabled,
  acceptButtonTitle,
  backendResponse,
  cancelButtonTitle,
  children,
  hideModal,
  isShown,
  requestIsSuccessful,
  targetForm,
  title,
}: ModalProps) {
  const bottomButtons = requestIsSuccessful ? (
    <Button form={targetForm} onClick={hideModal} type="reset" small>
      Close
    </Button>
  ) : (
    <>
      <Button
        form={targetForm}
        type="submit"
        small
        disabled={acceptButtonIsDisabled}
      >
        {acceptButtonTitle ? acceptButtonTitle : "Accept"}
      </Button>
      <Button form={targetForm} onClick={hideModal} type="reset" small>
        {cancelButtonTitle ? cancelButtonTitle : "Cancel"}
      </Button>
    </>
  );

  return (
    <>
      <Backdrop isShown={isShown} hideBackdrop={hideModal} />
      <div
        role="dialog"
        aria-labelledby={`${targetForm}-modal-title`}
        aria-describedby={`${targetForm}-modal-description`}
        className={`${styles.container} ${isShown && styles.containerIsShown}`}
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
                backendResponse.message &&
                backendResponse.status >= 400 &&
                styles.backendResponseError
              } ${
                backendResponse.message &&
                backendResponse.status < 400 &&
                styles.backendResponseSuccess
              }`}
              role="alert"
            >
              {backendResponse.message}
            </p>
          )}
        </div>
        <div className={styles.bottomButtonsContainer}>{bottomButtons}</div>
      </div>
    </>
  );
}

export default Modal;
