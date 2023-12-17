"use client";

import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input/Input";
import ListContainer from "@/components/ListContainer/ListContainer";
import Modal from "@/components/Modal/Modal";

import { createRequest } from "@/utils/requests";
import { NO_IMAGE_ICON_URL } from "@/utils/no-image-icon-url";

import styles from "../tools.module.scss";

interface AddIconFormProps {
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

function AddIconForm({
  formIsOpen,
  hideModal,
  id,
  resetFormValues,
  setToolsFrontend,
  icons,
}: AddIconFormProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });

  useEffect(() => {
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
    watch,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!data.url) {
      data.url = NO_IMAGE_ICON_URL;
    }
    try {
      const response = await fetch(
        createRequest({
          urlPath: "/icons",
          method: "POST",
          requestBody: data,
        })
      );

      const result = await response.json();

      setFormResponse({
        status: response.status,
        message: result.message,
      });

      setToolsFrontend((prevValue) => [...prevValue, id]);
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
      targetForm={`add-icon-form-${id}`}
      title="Add Icon"
    >
      <Form
        hasFieldset
        id={`add-icon-form-${id}`}
        legend="Add icon form"
        onSubmit={handleSubmit(onSubmit)}
        resetFormValues={resetFormValues}
      >
        <div className={styles.smallFormInnerContainer}>
          <ListContainer items={icons} title="All icons" usesIconPreview />
          <div className={styles.addIconFormInputsWrapper}>
            <Input
              aria-invalid={errors.name ? true : false}
              watchedValue={watch("name")}
              error={
                errors.name &&
                "Icon name needs to be between 2 and 50 characters."
              }
              formIsOpen={formIsOpen}
              id="add-icon-name-input"
              placeholder="Icon name"
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
              formIsOpen={formIsOpen}
              id="add-icon-url-input"
              placeholder="Icon url"
              type="url"
              {...register("url")}
            />
            <div className={styles.iconWrapper}>
              <h5 className={styles.iconTitle}>Icon preview</h5>
              <Image
                src={watch("url") || NO_IMAGE_ICON_URL}
                alt={"Icon preview"}
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default AddIconForm;
