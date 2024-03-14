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
import Image from "next/image";

import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input/Input";
import Modal from "@/components/Modal/Modal";

import { createRequest } from "@/utils/requests";
import { urlRegExp } from "@/utils/regular-expressions";

import styles from "./updateToolForm.module.scss";

interface UpdateToolFormProps {
  allIcons: any[];
  allTags: any[];
  formIsOpen: boolean;
  handleAddTag: (event) => void;
  handleRemoveTag: (event) => void;
  hideModal: MouseEventHandler;
  id: string;
  requestMethod: string;
  requestUrlPath: string;
  selectedTagsAddToolForm: any[];
  setToolsFrontend?: Dispatch<SetStateAction<any[]>>;
}

interface FormInputs {
  description: string;
  iconUrl: string;
  tags: string[];
  title: string;
  url: string;
  _id?: string;
}

function UpdateToolForm({
  allIcons,
  allTags,
  formIsOpen,
  handleAddTag,
  handleRemoveTag,
  hideModal,
  id,
  requestMethod,
  requestUrlPath,
  selectedTagsAddToolForm,
  setToolsFrontend,
}: UpdateToolFormProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  const [requestIsSuccessful, setRequestIsSuccessful] = useState(false);
  const [toolData, setToolData] = useState<FormInputs>();
  const selectSingleInput = useRef<HTMLSelectElement>(null);
  const [currentIconUrl, setCurrentIconUrl] = useState("");

  useEffect(() => {
    if (!formIsOpen) {
      setTimeout(() => {
        reset();
        setCurrentIconUrl("");
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
    if (formIsOpen) {
      fetch(createRequest({ urlPath: requestUrlPath }))
        .then((response) => response.json())
        .then((data) => {
          setToolData(data);
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("iconUrl", data.iconUrl);
          setValue("url", data.url);
        })
        .catch((error) => console.log(error));
    }
    if (formIsOpen && toolData) {
      setValue("title", toolData.title);
      setValue("description", toolData.description);
      setValue("iconUrl", toolData.iconUrl);
      setValue("url", toolData.url);
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
    data.tags = selectedTagsAddToolForm.map((selectedTag) => {
      return selectedTag._id;
    }); // Otherwise it would just pick the tags marked in the "Select tag(s)" dropdown.
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
      targetForm={`update-tool-form-${id}`}
      title="Update Tool"
      requestIsSuccessful={requestIsSuccessful}
    >
      <Form
        hasFieldset
        id={`update-tool-form-${id}`}
        legend="Update tool form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          aria-invalid={errors.url ? true : false}
          watchedValue={watch("url")}
          error={errors.url && "Invalid URL. Accepted format: <domain>/<path>"}
          formIsOpen={formIsOpen}
          id={`update-tool-url-input-${id}`}
          placeholder="Tool URL"
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
          id={`update-tool-title-input-${id}`}
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
          id={`update-tool-description-input-${id}`}
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
          allOptions={allTags}
          aria-invalid={errors.tags ? true : false}
          watchedValue={watch("tags")}
          error={errors.tags && "You need to select at least 1 tag."}
          formIsOpen={formIsOpen}
          id={`update-tool-select-tag(s)-input-${id}`}
          placeholder="Select tag(s)"
          type="selectMultiple"
          {...register("tags")}
        />

        {toolData ? (
          <>
            <div
              key={allIcons.find((icon) => icon.url === toolData.iconUrl)._id}
            >
              <Input
                allOptions={allIcons}
                formIsOpen={formIsOpen}
                placeholder="Choose icon"
                type="selectSingle"
                onChange={() => {
                  const selectedIconUrl = allIcons.find(
                    (icon) =>
                      icon.name ===
                      selectSingleInput.current.selectedOptions[0].innerText
                  ).url;
                  setCurrentIconUrl(selectedIconUrl);
                  setValue("iconUrl", selectedIconUrl);
                }}
                name="iconUrl"
                ref={selectSingleInput}
                selectedOptionByDefault={
                  allIcons.find((icon) => icon.url === toolData.iconUrl)._id
                }
              />
            </div>
            <div className={styles.iconWrapper}>
              <h5 className={styles.iconTitle}>Icon preview</h5>
              <Image
                src={currentIconUrl || toolData.iconUrl}
                alt={"Icon preview"}
                width={60}
                height={60}
              />
            </div>
          </>
        ) : (
          <p>"Loading..."</p>
        )}
      </Form>
    </Modal>
  );
}

export default UpdateToolForm;
