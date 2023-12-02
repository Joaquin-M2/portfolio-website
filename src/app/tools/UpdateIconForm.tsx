"use client";

import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input/Input";
import Modal from "@/components/Modal/Modal";

import { createRequest } from "@/utils/requests";
import { NO_IMAGE_ICON_URL } from "@/utils/no-image-icon-url";
import { urlRegExp } from "@/utils/regular-expressions";

import styles from "./tools.module.scss";

interface UpdateIconFormProps {
  formIsOpen: boolean;
  hideModal: MouseEventHandler;
  id?: string;
  resetFormValues?: boolean;
  setToolsFrontend?: Dispatch<SetStateAction<any[]>>;
  icons?: any[];
}

interface FormInputs {
  name: string;
  url: string;
}

function UpdateIconForm({
  formIsOpen,
  hideModal,
  id,
  resetFormValues,
  setToolsFrontend,
  icons,
}: UpdateIconFormProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  const selectSingleInput = useRef<HTMLSelectElement>();
  const [currentIconUrl, setCurrentIconUrl] = useState("");

  useEffect(() => {
    if (formIsOpen) {
      setValue("name", selectSingleInput.current.selectedOptions[0].innerText);
      setValue(
        "url",
        icons.find(
          (icon) =>
            icon.name === selectSingleInput.current.selectedOptions[0].innerText
        ).url
      );
      setCurrentIconUrl(
        icons.find(
          (icon) =>
            icon.name === selectSingleInput.current.selectedOptions[0].innerText
        ).url
      );
    }
    if (!formIsOpen) {
      reset();
      setTimeout(() => {
        setFormResponse((prevValue) => ({ ...prevValue, message: "" }));
      }, 500); // Time until CSS transition finishes.
    }
  }, [formIsOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await fetch(
        createRequest({
          urlPath: `/icons/${selectSingleInput.current.value}`,
          method: "PATCH",
          requestBody: data,
        })
      );

      const result = await response.json();

      setFormResponse({
        status: response.status,
        message: result.message,
      });

      setToolsFrontend((prevValue) => [
        ...prevValue,
        selectSingleInput.current.value,
      ]);

      setCurrentIconUrl(data.url);
    } catch (error) {
      setFormResponse({
        status: 500,
        message: error.message,
      });
      throw error.message;
    }
  };

  return (
    <Modal
      backendResponse={formResponse}
      isShown={formIsOpen}
      hideModal={hideModal}
      targetForm={`update-icon-form-${id}`}
      title="Update Icon"
    >
      <Form
        hasFieldset
        id={`update-icon-form-${id}`}
        legend="Update icon form"
        onSubmit={handleSubmit(onSubmit)}
        resetFormValues={resetFormValues}
      >
        <div className={styles.smallFormInnerContainer}>
          <div className={styles.iconsSelectorAndImagesContainer}>
            <Input
              allOptions={icons}
              formIsOpen={formIsOpen}
              placeholder="Choose icon"
              type="selectSingle"
              ref={selectSingleInput}
              onChange={() => {
                setValue(
                  "name",
                  selectSingleInput.current.selectedOptions[0].innerText
                );
                setValue(
                  "url",
                  icons.find(
                    (icon) =>
                      icon.name ===
                      selectSingleInput.current.selectedOptions[0].innerText
                  ).url
                );
                setCurrentIconUrl(
                  icons.find(
                    (icon) =>
                      icon.name ===
                      selectSingleInput.current.selectedOptions[0].innerText
                  ).url
                );
              }}
            />
            <div className={styles.iconsContainer}>
              <div className={styles.iconWrapper}>
                <h5 className={styles.iconTitle}>Current icon</h5>
                <Image
                  src={currentIconUrl || NO_IMAGE_ICON_URL}
                  alt={"Icon preview"}
                  width={60}
                  height={60}
                />
              </div>
              <div className={styles.iconWrapper}>
                <h5 className={styles.iconTitle}>New icon</h5>
                <Image
                  src={watch("url") || NO_IMAGE_ICON_URL}
                  alt={"New icon preview"}
                  width={60}
                  height={60}
                />
              </div>
            </div>
          </div>
          <div className={styles.updateIconFormInputsWrapper}>
            <Input
              aria-invalid={errors.name ? true : false}
              watchedValue={watch("name")}
              error={
                errors.name &&
                "Icon name needs to be between 2 and 50 characters."
              }
              formIsOpen={formIsOpen}
              id="update-icon-title-input"
              placeholder="Update icon name"
              required
              type="text"
              {...register("name", {
                required: true,
                minLength: 2,
                maxLength: 50,
              })}
            />
            <Input
              aria-invalid={errors.url ? true : false}
              watchedValue={watch("url")}
              error={
                errors.url && "Invalid URL. Accepted format: <domain>/<path>"
              }
              formIsOpen={formIsOpen}
              id="update-icon-url-input"
              placeholder="Update icon url"
              required
              type="url"
              {...register("url", {
                required: true,
                pattern: urlRegExp,
              })}
            />
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default UpdateIconForm;
