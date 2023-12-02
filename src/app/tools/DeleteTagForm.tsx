"use client";

import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input/Input";
import Modal from "@/components/Modal/Modal";
import Tag from "@/components/Tag/Tag";

import { createRequest } from "@/utils/requests";

import styles from "./tools.module.scss";

interface DeleteTagFormProps {
  formIsOpen: boolean;
  hideModal: MouseEventHandler;
  id?: string;
  resetFormValues?: boolean;
  setToolsFrontend?: Dispatch<SetStateAction<any[]>>;
  tags?: any[];
}

function DeleteTagForm({
  formIsOpen,
  hideModal,
  id,
  resetFormValues,
  setToolsFrontend,
  tags,
}: DeleteTagFormProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  const selectSingleInput = useRef<HTMLSelectElement>();
  const [selectedTagName, setSelectedTagName] = useState("");

  useEffect(() => {
    if (!formIsOpen) {
      setTimeout(() => {
        setFormResponse((prevValue) => ({ ...prevValue, message: "" }));
      }, 500); // Time until CSS transition finishes.
    }
    if (formIsOpen) {
      setSelectedTagName(
        selectSingleInput.current.selectedOptions[0].innerText
      );
    }
  }, [formIsOpen]);

  const onSubmit = async () => {
    try {
      const response = await fetch(
        createRequest({
          urlPath: `/tags/${selectSingleInput.current.value}`,
          method: "DELETE",
        })
      );

      const result = await response.json();

      setFormResponse({
        status: response.status,
        message: result.message,
      });

      if (response.status >= 200 && response.status < 400) {
        if (selectSingleInput.current.selectedOptions[0].nextElementSibling) {
          setSelectedTagName(
            (
              selectSingleInput.current.selectedOptions[0]
                .nextElementSibling as HTMLElement
            ).innerText
          );
        } else {
          setSelectedTagName(
            (
              selectSingleInput.current.selectedOptions[0]
                .parentElement[0] as HTMLElement
            ).innerText
          );
        }
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
      targetForm={`delete-tag-form-${id}`}
      title="Delete Tag"
    >
      <Form
        hasFieldset
        id={`delete-tag-form-${id}`}
        legend="Delete tag form"
        onSubmit={async (e) => {
          e.preventDefault();
          onSubmit();
        }}
        resetFormValues={resetFormValues}
      >
        <div className={styles.smallFormInnerContainer}>
          <Input
            allOptions={tags}
            formIsOpen={formIsOpen}
            placeholder="Choose tag"
            type="selectSingle"
            ref={selectSingleInput}
            onChange={() => {
              setSelectedTagName(
                selectSingleInput.current.selectedOptions[0].innerText
              );
            }}
          />
          {selectedTagName && (
            <p className={styles.deleteTagQuestion}>
              Delete <Tag>{selectedTagName}</Tag> tag?
            </p>
          )}
        </div>
      </Form>
    </Modal>
  );
}

export default DeleteTagForm;
