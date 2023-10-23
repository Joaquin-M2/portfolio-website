"use client";

import React, { FormEventHandler } from "react";

import styles from "./form.module.scss";

interface FormProps {
  children: JSX.Element | JSX.Element[];
  hasFieldset?: boolean;
  id?: string;
  legend?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

function Form({ children, hasFieldset, id, legend, onSubmit }: FormProps) {
  return hasFieldset ? (
    <form id={id} onSubmit={onSubmit}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{legend}</legend>
        {children}
      </fieldset>
    </form>
  ) : (
    <form id={id} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
