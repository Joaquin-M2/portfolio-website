"use client";

import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { createRequest } from "../../utils/requests";

interface AddToolFormProps {
  formIsOpen: boolean;
  hideModal: MouseEventHandler;
  id?: string;
  resetFormValues?: boolean;
  setToolsFrontend?: Dispatch<SetStateAction<any[]>>;
  tags?: any[];
}

interface FormInputs {
  name: string;
}

function AddTagForm({
  formIsOpen,
  hideModal,
  id,
  resetFormValues,
  setToolsFrontend,
  tags,
}: AddToolFormProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  const [requestIsSuccessful, setRequestIsSuccessful] = useState(false);

  useEffect(() => {
    if (!formIsOpen) {
      reset();
      setTimeout(() => {
        setFormResponse((prevValue) => ({ ...prevValue, message: "" }));
        setRequestIsSuccessful(false);
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

      if (response.status >= 200 && response.status < 400) {
        setRequestIsSuccessful(true);
      }
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
      targetForm={`add-tag-form-${id}`}
      title="Add Tag"
      requestIsSuccessful={requestIsSuccessful}
    >
      <Form
        hasFieldset
        id={`add-tag-form-${id}`}
        legend="Add tag form"
        onSubmit={handleSubmit(onSubmit)}
        resetFormValues={resetFormValues}
      >
        <div
          style={{ display: "flex", alignItems: "center", margin: "0 1rem" }}
        >
          <Input
            allTags={tags}
            formIsOpen={formIsOpen}
            placeholder="All tags"
            type="selectMultiple"
          />
          <Input
            aria-invalid={errors.name ? true : false}
            watchedValue={watch("name")}
            error={
              errors.name && "Tag name needs to be between 2 and 50 characters."
            }
            formIsOpen={formIsOpen}
            id="add-tag-title-input"
            placeholder="Tag name"
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
