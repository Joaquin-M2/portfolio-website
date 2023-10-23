"use client";

import { useEffect, useRef } from "react";

import styles from "./input.module.scss";

interface InputProps {
  error: string;
  formIsOpen: boolean;
  id: string;
  placeholder: string;
  type: string;
  [x: string]: any;
}

function Input({
  error,
  formIsOpen,
  id,
  placeholder,
  type,
  ...props
}: InputProps) {
  const inputField = useRef<HTMLInputElement>();
  const errorText = useRef<HTMLElement>();

  useEffect(() => {
    if (formIsOpen === false) {
      inputField.current.classList.remove(styles.inputSuccess);
      inputField.current.classList.remove(styles.inputError);
      inputField.current.value = "";
      errorText.current.style.display = "none";
    }
  }, [formIsOpen]);

  let timeout = null;

  function showError(input, message) {
    input.current.classList.remove(styles.inputSuccess);
    input.current.classList.add(styles.inputError);
    errorText.current.classList.add(styles.error);
    errorText.current.style.display = "inline-block";
    errorText.current.textContent = message;
  }

  function showSuccess(input) {
    input.current.classList.remove(styles.inputError);
    input.current.classList.add(styles.inputSuccess);
    errorText.current.style.display = "none";
    errorText.current.classList.remove(styles.error);
  }

  function checkTextField() {
    if (inputField.current.value.trim() === "") {
      showError(inputField, "This field cannot be left empty.");
    } else if (inputField.current.value.length < 3) {
      showError(inputField, "This field needs to be longer than 2 characters.");
    } else if (inputField.current.value.length > 21) {
      showError(
        inputField,
        "This field needs to be shorter than 20 characters."
      );
    } else {
      showSuccess(inputField);
    }
    //activateFormButtonHandler();
  }

  function validateEmail(email) {
    const regExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
  }

  function checkEmailField() {
    if (inputField.current.value.trim() === "") {
      showError(inputField, "Please, enter your email.");
    } else if (!validateEmail(inputField.current.value)) {
      showError(inputField, "Please, enter a valid email.");
    } else {
      showSuccess(inputField);
    }
    //activateFormButtonHandler();
  }

  function checkPasswordField() {
    if (inputField.current.value.trim() === "") {
      showError(inputField, "Please, enter your password.");
    } else if (inputField.current.value.length < 6) {
      showError(
        inputField,
        "Your password needs to be longer than 6 characters."
      );
    } else if (inputField.current.value.length > 21) {
      showError(
        inputField,
        "Your password needs to be shorter than 20 characters."
      );
    } else {
      showSuccess(inputField);
    }
    //activateFormButtonHandler();
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

  function handleKeyUpInput(checkInputFunction) {
    clearTimeout(timeout);

    // Make a new timeout set
    timeout = setTimeout(() => {
      checkInputFunction;
    }, 200);
  }

  return (
    <div className={styles.formField}>
      <input
        aria-invalid={error ? "true" : "false"}
        className={styles.input}
        id={id}
        onKeyUp={() => handleKeyUpInput(checkValidationType(type))}
        placeholder={placeholder}
        ref={inputField}
        type={type}
        {...props}
      />
      <label className={styles.label} htmlFor={id}>
        {placeholder}
      </label>
      <small className={styles.error} ref={errorText} role="alert">
        {error}
      </small>
    </div>
  );
}

export default Input;
