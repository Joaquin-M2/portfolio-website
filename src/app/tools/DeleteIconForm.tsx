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

import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input/Input";
import Modal from "@/components/Modal/Modal";

import { createRequest } from "@/utils/requests";

import styles from "./tools.module.scss";

interface DeleteToolFormProps {
  formIsOpen: boolean;
  hideModal: MouseEventHandler;
  id?: string;
  resetFormValues?: boolean;
  setToolsFrontend?: Dispatch<SetStateAction<any[]>>;
  icons?: any[];
}

function DeleteIconForm({
  formIsOpen,
  hideModal,
  id,
  resetFormValues,
  setToolsFrontend,
  icons,
}: DeleteToolFormProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  const selectSingleInput = useRef<HTMLSelectElement>();
  const [selectedIconName, setSelectedIconName] = useState("");

  useEffect(() => {
    if (!formIsOpen) {
      setTimeout(() => {
        setFormResponse((prevValue) => ({ ...prevValue, message: "" }));
      }, 500); // Time until CSS transition finishes.
    }
    if (formIsOpen) {
      setSelectedIconName(
        selectSingleInput.current.selectedOptions[0].innerText
      );
    }
  }, [formIsOpen]);

  const onSubmit = async () => {
    console.dir(selectSingleInput.current.selectedOptions[0]);
    try {
      const response = await fetch(
        createRequest({
          urlPath: `/icons/${selectSingleInput.current.value}`,
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
          setSelectedIconName(
            (
              selectSingleInput.current.selectedOptions[0]
                .nextElementSibling as HTMLElement
            ).innerText
          );
        } else {
          setSelectedIconName(
            (
              selectSingleInput.current.selectedOptions[0]
                .parentElement[0] as HTMLElement
            ).innerText
          );
        }
      }
      setToolsFrontend((prevValue) => [
        ...prevValue,
        selectSingleInput.current.value,
      ]);
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
      targetForm={`delete-icon-form-${id}`}
      title="Delete Icon"
    >
      <Form
        hasFieldset
        id={`delete-icon-form-${id}`}
        legend="Delete icon form"
        onSubmit={async (e) => {
          e.preventDefault();
          onSubmit();
        }}
        resetFormValues={resetFormValues}
      >
        <div className={styles.smallFormInnerContainerVertical}>
          <Input
            allOptions={icons}
            formIsOpen={formIsOpen}
            placeholder="Choose icon"
            type="selectSingle"
            ref={selectSingleInput}
            onChange={() => {
              setSelectedIconName(
                selectSingleInput.current.selectedOptions[0].innerText
              );
            }}
          />
          {selectedIconName && (
            <div className={styles.iconConfirmDelete}>
              <p className={styles.deleteTagQuestion}>
                Delete "{selectedIconName}" icon?
              </p>
              <Image
                src={icons.find((icon) => icon.name === selectedIconName).url}
                alt={"Icon preview"}
                width={60}
                height={60}
              />
            </div>
          )}
        </div>
      </Form>
    </Modal>
  );
}

export default DeleteIconForm;
