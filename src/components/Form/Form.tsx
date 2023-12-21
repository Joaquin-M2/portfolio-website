"use client";

import React, { FormEventHandler, useEffect, useRef } from "react";

import styles from "./form.module.scss";
import Button from "../Button/Button";

interface FormProps {
  children: JSX.Element | JSX.Element[];
  hasFieldset?: boolean;
  id?: string;
  legend?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  resetFormValues?: boolean;
  usesItsOwnButtons?: boolean;
  onReset?: () => void;
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
}: FormProps) {
  const form = useRef<HTMLFormElement>();

  useEffect(() => {
    if (resetFormValues) form.current.reset();
  }, [resetFormValues]);

  const formButtons = (
    <div className={styles.buttonsContainer}>
      <Button form={id} type="submit">
        Send
      </Button>
      <Button form={id} type="reset" onClick={onReset}>
        Clear
      </Button>
    </div>
  );

  return hasFieldset ? (
    <form id={id} onSubmit={onSubmit} ref={form}>
      {legend ? (
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>{legend}</legend>
          {children}
          {usesItsOwnButtons && formButtons}
        </fieldset>
      ) : (
        <>
          {children}
          {usesItsOwnButtons && formButtons}
        </>
      )}
    </form>
  ) : (
    <form id={id} onSubmit={onSubmit} ref={form}>
      {children}
      {usesItsOwnButtons && formButtons}
    </form>
  );
}

export default Form;
