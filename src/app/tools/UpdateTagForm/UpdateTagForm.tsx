"use client";

import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input/Input";
import Modal from "@/components/Modal/Modal";

import { createRequest } from "@/utils/requests";

import styles from "../tools.module.scss";

interface UpdateTagFormProps {
  formIsOpen: boolean;
  hideModal: MouseEventHandler;
  resetFormValues: boolean;
  setToolsFrontend: Dispatch<SetStateAction<any[]>>;
  tags: any[];
}

interface FormInputs {
  name: string;
}

function UpdateTagForm({
  formIsOpen,
  hideModal,
  resetFormValues,
  setToolsFrontend,
  tags,
}: UpdateTagFormProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  const selectSingleInput = useRef<HTMLSelectElement>();

  useEffect(() => {
    if (formIsOpen) {
      setValue("name", selectSingleInput.current.selectedOptions[0].innerText);
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
          urlPath: `/tags/${selectSingleInput.current.value}`,
          method: "PATCH",
          requestBody: data,
        })
      );

      const result = await response.json();

      setFormResponse({
        status: response.status,
        message: result.message,
      });

      setToolsFrontend((prevValue) => [...prevValue]);
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
      targetForm={`update-tag-form`}
      title="Update Tag"
    >
      <Form
        hasFieldset
        id={`update-tag-form`}
        legend="Update tag form"
        onSubmit={handleSubmit(onSubmit)}
        resetFormValues={resetFormValues}
      >
        <div className={styles.smallFormInnerContainer}>
          <Input
            allOptions={tags}
            formIsOpen={formIsOpen}
            placeholder="Choose tag"
            type="selectSingle"
            ref={selectSingleInput}
            onChange={() =>
              setValue(
                "name",
                selectSingleInput.current.selectedOptions[0].innerText
              )
            }
          />
          <Input
            aria-invalid={errors.name ? true : false}
            watchedValue={watch("name")}
            error={
              errors.name && "Tag name needs to be between 2 and 50 characters."
            }
            formIsOpen={formIsOpen}
            id="update-tag-title-input"
            placeholder="Update tag name"
            required
            type="text"
            {...register("name", {
              required: true,
              minLength: 2,
              maxLength: 50,
            })}
          />
        </div>
      </Form>
    </Modal>
  );
}

export default UpdateTagForm;
