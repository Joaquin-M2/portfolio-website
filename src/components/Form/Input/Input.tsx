"use client";

import { forwardRef, useEffect, useState } from "react";

import { emailRegExp } from "../../../utils/email-regexp";

import styles from "./input.module.scss";

interface InputProps {
  watchedValue: string;
  error: string;
  formIsOpen: boolean;
  id: string;
  placeholder: string;
  type: string;
  [x: string]: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { watchedValue, error, formIsOpen, id, placeholder, type, ...props },
    ref
  ) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    function checkTextField() {
      if (
        watchedValue.trim() === "" ||
        watchedValue.length < 3 ||
        watchedValue.length > 21
      ) {
        setIsError(true);
        setIsSuccess(false);
      } else {
        setIsSuccess(true);
        setIsError(false);
      }
    }

    function validateEmail(email) {
      return emailRegExp.test(String(email).toLowerCase());
    }

    function checkEmailField() {
      if (watchedValue.trim() === "" || !validateEmail(watchedValue)) {
        setIsError(true);
        setIsSuccess(false);
      } else {
        setIsSuccess(true);
        setIsError(false);
      }
    }

    function checkPasswordField() {
      if (
        watchedValue.trim() === "" ||
        watchedValue.length < 6 ||
        watchedValue.length > 20
      ) {
        setIsError(true);
        setIsSuccess(false);
      } else {
        setIsSuccess(true);
        setIsError(false);
      }
    }

    function checkValidationType(inputType) {
      switch (inputType) {
        case "text":
          checkTextField();
          break;

        case "email":
          checkEmailField();
          break;

        case "password":
          checkPasswordField();
          break;
      }
    }

    useEffect(() => {
      if (watchedValue) checkValidationType(type);
    }, [watchedValue]);

    return (
      <div className={styles.formField}>
        <input
          aria-invalid={error ? "true" : "false"}
          className={`${styles.input} ${
            (formIsOpen &&
              isSuccess &&
              watchedValue !== "" &&
              styles.success) ||
            (formIsOpen && isError && watchedValue !== "" && styles.error)
          }`}
          id={id}
          placeholder={placeholder}
          ref={ref}
          type={type}
          {...props}
        />
        <label className={styles.label} htmlFor={id}>
          {placeholder}
        </label>
        <small
          className={`${
            (formIsOpen && isError && styles.errorMessage) ||
            (formIsOpen && isSuccess && styles.noErrorMessage)
          } `}
          role="alert"
        >
          {error}
        </small>
      </div>
    );
  }
);

export default Input;
