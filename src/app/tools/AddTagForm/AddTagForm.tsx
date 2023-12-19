"use client";

import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input/Input";
import ListContainer from "@/components/ListContainer/ListContainer";
import Modal from "@/components/Modal/Modal";

import { createRequest } from "@/utils/requests";

import styles from "../tools.module.scss";

interface AddToolFormProps {
  formIsOpen: boolean;
  hideModal: MouseEventHandler;
  resetFormValues: boolean;
  setToolsFrontend: Dispatch<SetStateAction<any[]>>;
  tags: any[];
}

interface FormInputs {
  name: string;
}

function AddTagForm({
  formIsOpen,
  hideModal,
  resetFormValues,
  setToolsFrontend,
  tags,
}: AddToolFormProps) {
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
    try {
      const response = await fetch(
        createRequest({
          urlPath: "/tags",
          method: "POST",
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
      targetForm={`add-tag-form`}
      title="Add Tag"
    >
      <Form
        hasFieldset
        id={`add-tag-form`}
        legend="Add tag form"
        onSubmit={handleSubmit(onSubmit)}
        resetFormValues={resetFormValues}
      >
        <div className={styles.smallFormInnerContainer}>
          <ListContainer items={tags} title="All added tags" />
          <Input
            aria-invalid={errors.name ? true : false}
            watchedValue={watch("name")}
            error={
              errors.name && "Tag name needs to be between 2 and 50 characters."
            }
            formIsOpen={formIsOpen}
            id="add-tag-title-input"
            placeholder="New tag name"
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

export default AddTagForm;
