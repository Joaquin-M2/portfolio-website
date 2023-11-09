"use client";

import { forwardRef, useEffect, useState } from "react";

import { emailRegExp, urlRegExp } from "../../../utils/regular-expressions";

import styles from "./input.module.scss";
import Tag from "../../ToolCard/Tag/Tag";

interface InputProps {
  handleAddTag?: (event) => void;
  selectedTagsAddToolForm?: any[];
  error: string;
  formIsOpen: boolean;
  handleRemoveTag?: (event) => void;
  id: string;
  onBlur?: () => void;
  placeholder: string;
  tags?: any[];
  type: string;
  watchedValue: string;
  [x: string]: any;
}

const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  InputProps
>(
  (
    {
      handleAddTag,
      selectedTagsAddToolForm,
      handleRemoveTagInForm,
      handleRemoveTag,
      watchedValue,
      error,
      formIsOpen,
      id,
      onBlur,
      placeholder,
      tags,
      type,
      ...props
    },
    ref
  ) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    function checkTextField() {
      if (
        watchedValue.trim() === "" ||
        watchedValue.length < 3 ||
        watchedValue.length > 50
      ) {
        setIsError(true);
        setIsSuccess(false);
      } else {
        setIsSuccess(true);
        setIsError(false);
      }
    }

    function checkTextareaField() {
      if (
        watchedValue.trim() === "" ||
        watchedValue.length < 10 ||
        watchedValue.length > 250
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

    function validateUrl(url) {
      return urlRegExp.test(String(url).toLowerCase());
    }

    function checkUrlField() {
      if (watchedValue.trim() === "" || !validateUrl(watchedValue)) {
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

        case "textarea":
          checkTextareaField();
          break;

        case "email":
          checkEmailField();
          break;

        case "password":
          checkPasswordField();
          break;

        case "url":
          checkUrlField();
          break;
      }
    }

    useEffect(() => {
      if (watchedValue) checkValidationType(type);
    }, [watchedValue]);

    const dropdownOptions =
      tags && tags.length ? (
        tags
          .filter(
            (tag) =>
              !selectedTagsAddToolForm.some(
                (selectedTag) => selectedTag.id === tag._id
              )
          )
          .map((tag, id) => (
            <option key={id} value={tag._id} onClick={handleAddTag}>
              {tag.name}
            </option>
          ))
      ) : (
        <option>Loading...</option>
      );

    const inputJsx = () => {
      if (type === "selectMultiple") {
        return (
          <>
            <div
              className={styles.selectTagsContainer}
              onBlur={onBlur}
              tabIndex={0}
            >
              <select
                className={styles.selectInput}
                name="tags"
                multiple
                ref={ref as React.Ref<HTMLSelectElement>}
                {...props}
              >
                {dropdownOptions}
              </select>
              <div className={styles.tagsContainer}>
                {selectedTagsAddToolForm.map((selectedTag, id) => (
                  <Tag
                    key={id}
                    isFilterButton
                    handleRemoveFilterTag={handleRemoveTag}
                  >
                    {tags.find((tag) => tag._id === selectedTag.id).name}
                  </Tag>
                ))}
              </div>
            </div>
          </>
        );
      } else if (type === "textarea") {
        return (
          <textarea
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
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...props}
          />
        );
      } else {
        return (
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
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            {...props}
          />
        );
      }
    };

    return (
      <div className={styles.formField}>
        {inputJsx()}
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
