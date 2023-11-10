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
import { urlRegExp } from "../../utils/regular-expressions";

interface AddToolFormProps {
  formIsOpen: boolean;
  handleAddTag?: (event) => void;
  handleRemoveTag?: (event) => void;
  hideModal: MouseEventHandler;
  id?: string;
  requestMethod: string;
  requestUrlPath: string;
  resetFormValues?: boolean;
  selectedTagsAddToolForm?: any[];
  setToolsFrontend?: Dispatch<SetStateAction<any[]>>;
  tags?: any[];
}

interface FormInputs {
  description: string;
  iconUrl: string;
  tags: string[];
  title: string;
  url: string;
}

function AddToolForm({
  formIsOpen,
  handleAddTag,
  handleRemoveTag,
  hideModal,
  id,
  requestMethod,
  requestUrlPath,
  resetFormValues,
  selectedTagsAddToolForm,
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
    if (
      !formIsOpen &&
      formResponse.message &&
      requestUrlPath.startsWith("/tools")
    ) {
      setTimeout(() => {
        setToolsFrontend((prevValue) => [...prevValue, id]);
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
    data.tags = selectedTagsAddToolForm.map((selectedTag) => {
      return selectedTag._id;
    }); // Otherwise it would just pick the tags marked in the "Select tag(s)" dropdown.
    try {
      console.log(data);
      const response = await fetch(
        createRequest({
          urlPath: requestUrlPath,
          method: requestMethod,
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
        if (requestUrlPath === "/user/login") {
          localStorage.setItem("userToken", result.token);
        }
      }
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
      targetForm={`add-tool-form-${id}`}
      title="Add Tool"
      requestIsSuccessful={requestIsSuccessful}
    >
      <Form
        hasFieldset
        id={`add-tool-form-${id}`}
        legend="Add tool form"
        onSubmit={handleSubmit(onSubmit)}
        resetFormValues={resetFormValues}
      >
        <Input
          aria-invalid={errors.title ? true : false}
          watchedValue={watch("title")}
          error={
            errors.title && "Title needs to be between 3 and 50 characters."
          }
          formIsOpen={formIsOpen}
          id="add-tool-title-input"
          placeholder="Title"
          required
          type="text"
          {...register("title", {
            required: true,
            minLength: 3,
            maxLength: 50,
          })}
        />
        <Input
          aria-invalid={errors.description ? true : false}
          watchedValue={watch("description")}
          error={
            errors.description &&
            "Description needs to be between 10 and 250 characters."
          }
          formIsOpen={formIsOpen}
          id="add-tool-description-input"
          placeholder="Description"
          required
          type="textarea"
          {...register("description", {
            required: true,
            minLength: 10,
            maxLength: 250,
          })}
        />
        <Input
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          selectedTagsAddToolForm={selectedTagsAddToolForm}
          allTags={tags}
          aria-invalid={errors.tags ? true : false}
          watchedValue={watch("tags")}
          error={errors.tags && "You need to select at least 1 tag."}
          formIsOpen={formIsOpen}
          id="add-tool-select-tag(s)-input"
          placeholder="Select tag(s)"
          required
          type="selectMultiple"
          {...register("tags", {
            required: true,
          })}
        />
        <Input
          aria-invalid={errors.iconUrl ? true : false}
          watchedValue={watch("iconUrl")}
          error={
            errors.iconUrl && "Invalid URL. Accepted format: <domain>/<path>"
          }
          formIsOpen={formIsOpen}
          id="add-tool-icon-url-input"
          placeholder="Icon URL"
          required
          type="url"
          {...register("iconUrl", {
            pattern: urlRegExp,
          })}
        />
        <Input
          aria-invalid={errors.url ? true : false}
          watchedValue={watch("url")}
          error={errors.url && "Invalid URL. Accepted format: <domain>/<path>"}
          formIsOpen={formIsOpen}
          id="add-tool-url-input"
          placeholder="Tool URL"
          required
          type="url"
          {...register("url", {
            required: true,
            pattern: urlRegExp,
          })}
        />
      </Form>
    </Modal>
  );
}

export default AddToolForm;
