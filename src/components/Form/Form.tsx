"use client";

import React, { FormEventHandler, useEffect, useRef } from "react";

import styles from "./form.module.scss";

interface FormProps {
  children: JSX.Element | JSX.Element[];
  hasFieldset?: boolean;
  id?: string;
  legend?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  resetFormValues?: boolean;
}

function Form({
  children,
  hasFieldset,
  id,
  legend,
  onSubmit,
  resetFormValues,
}: FormProps) {
  const form = useRef<HTMLFormElement>();

  useEffect(() => {
    if (resetFormValues) form.current.reset();
  }, [resetFormValues]);

  return hasFieldset ? (
    <form id={id} onSubmit={onSubmit} ref={form}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{legend}</legend>
        {children}
      </fieldset>
    </form>
  ) : (
    <form id={id} onSubmit={onSubmit} ref={form}>
      {children}
    </form>
  );
}

export default Form;
