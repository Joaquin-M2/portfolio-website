"use client";

import React, { FormEventHandler, useEffect, useRef } from "react";

import styles from "./form.module.scss";
import Button from "../Button/Button";
import Alert from "../Alert/Alert";

interface FormProps {
  children: JSX.Element | JSX.Element[];
  hasFieldset?: boolean;
  id: string;
  legend?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  resetFormValues?: boolean;
  usesItsOwnButtons?: boolean;
  onReset?: () => void;
  backendResponse?: { message: string; status: number };
  isPending?: boolean;
}

function Form({
  children,
  hasFieldset,
  id,
  legend,
  onSubmit,
  resetFormValues,
  usesItsOwnButtons,
  onReset,
  backendResponse,
  isPending,
}: FormProps) {
  const form = useRef<HTMLFormElement>();

  useEffect(() => {
    if (resetFormValues) form.current.reset();
  }, [resetFormValues]);

  const formButtons = (
    <div className={styles.bottomSectionContainer}>
      {isPending ? (
        <p className={styles.loader}>Sending...</p>
      ) : (
        <Alert backendResponse={backendResponse} />
      )}
      <div className={styles.buttonsContainer}>
        <Button form={id} type="submit" disabled={isPending}>
          Send
        </Button>
        <Button form={id} type="reset" disabled={isPending} onClick={onReset}>
          Clear
        </Button>
      </div>
    </div>
  );

  return hasFieldset ? (
    <form id={id} onSubmit={onSubmit} ref={form} role="form">
      <fieldset className={styles.fieldset}>
        {legend && (
          <legend className={styles.legend} role="heading" aria-level={2}>
            {legend}
          </legend>
        )}
        {children}
        {usesItsOwnButtons && formButtons}
      </fieldset>
    </form>
  ) : (
    <form id={id} onSubmit={onSubmit} ref={form} role="form">
      {children}
      {usesItsOwnButtons && formButtons}
    </form>
  );
}

export default Form;
