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

import styles from "../resources.module.scss";

interface AddResourceFormProps {
  formIsOpen: boolean;
  handleAddTag: (event) => void;
  handleRemoveTag: (event) => void;
  hideModal: MouseEventHandler;
  icons: any[];
  requestMethod: string;
  requestUrlPath: string;
  resetFormValues: boolean;
  selectedTagsAddToolForm: any[];
  setToolsFrontend: Dispatch<SetStateAction<any[]>>;
  tags: any[];
}

interface FormInputs {
  description: string;
  iconUrl: string;
  tags: string[];
  title: string;
  url: string;
}

function AddResourceForm({
  formIsOpen,
  handleAddTag,
  handleRemoveTag,
  hideModal,
  icons,
  requestMethod,
  requestUrlPath,
  resetFormValues,
  selectedTagsAddToolForm,
  setToolsFrontend,
  tags,
}: AddResourceFormProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  const [requestIsSuccessful, setRequestIsSuccessful] = useState(false);
  const selectSingleInput = useRef<HTMLSelectElement>(null);
  const [currentIconUrl, setCurrentIconUrl] = useState("");

  useEffect(() => {
    if (formIsOpen) {
      setCurrentIconUrl(
        icons.find(
          (icon) => icon._id === "655c3872473ea18c182edf70" // "NO IMAGE" icon.
        ).url
      );
    }
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
      requestUrlPath.startsWith("/resources")
    ) {
      setTimeout(() => {
        setToolsFrontend((prevValue) => [...prevValue]);
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

  useEffect(() => {
    register("iconUrl");
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    data.tags = selectedTagsAddToolForm.map((selectedTag) => {
      return selectedTag._id;
    }); // Otherwise it would just pick the tags marked in the "Select tag(s)" dropdown.
    data.iconUrl = currentIconUrl; // So there is actually a url in the form, even if the user didn't select anything on the dropdown.
    try {
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
      targetForm={`add-resource-form`}
      title="Add Resource"
      requestIsSuccessful={requestIsSuccessful}
    >
      <Form
        hasFieldset
        id={`add-resource-form`}
        legend="Add resource form"
        onSubmit={handleSubmit(onSubmit)}
        resetFormValues={resetFormValues}
      >
        <Input
          aria-invalid={errors.url ? true : false}
          watchedValue={watch("url")}
          error={errors.url && "Invalid URL. Accepted format: <domain>/<path>"}
          formIsOpen={formIsOpen}
          id="add-resource-url-input"
          placeholder="Resource URL"
          required
          type="url"
          {...register("url", {
            required: true,
            pattern: urlRegExp,
          })}
        />
        <Input
          aria-invalid={errors.title ? true : false}
          watchedValue={watch("title")}
          error={
            errors.title && "Title needs to be between 3 and 50 characters."
          }
          formIsOpen={formIsOpen}
          id="add-resource-title-input"
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
          id="add-resource-description-input"
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
          allOptions={tags}
          aria-invalid={errors.tags ? true : false}
          watchedValue={watch("tags")}
          error={errors.tags && "You need to select at least 1 tag."}
          formIsOpen={formIsOpen}
          id="add-resource-select-tag(s)-input"
          placeholder="Select tag(s)"
          required
          type="selectMultiple"
          {...register("tags", {
            required: true,
          })}
        />
        <Input
          allOptions={icons}
          formIsOpen={formIsOpen}
          placeholder="Choose icon"
          type="selectSingle"
          onChange={() => {
            const selectedIconUrl = icons.find(
              (icon) =>
                icon.name ===
                selectSingleInput.current.selectedOptions[0].innerText
            ).url;
            setCurrentIconUrl(selectedIconUrl);
            setValue("iconUrl", selectedIconUrl);
          }}
          name="iconUrl"
          ref={selectSingleInput}
        />
        <div className={styles.iconWrapper}>
          <h5 className={styles.iconTitle}>Icon preview</h5>
          <Image
            src={currentIconUrl || NO_IMAGE_ICON_URL}
            alt={"Icon preview"}
            width={60}
            height={60}
          />
        </div>
      </Form>
    </Modal>
  );
}

export default AddResourceForm;
