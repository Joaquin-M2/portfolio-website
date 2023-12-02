"use client";

import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import Form from "@/components/Form/Form";
import Modal from "@/components/Modal/Modal";

import { createRequest } from "@/utils/requests";

import styles from "./deleteToolForm.module.scss";

interface DeleteToolFormProps {
  description: string;
  formIsOpen: boolean;
  hideModal: MouseEventHandler;
  id: string;
  setToolsFrontend: Dispatch<SetStateAction<any[]>>;
  title: string;
}

function DeleteToolForm({
  description,
  formIsOpen,
  hideModal,
  id,
  setToolsFrontend,
  title,
}: DeleteToolFormProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  const [requestIsSuccessful, setRequestIsSuccessful] = useState(false);

  useEffect(() => {
    if (!formIsOpen) {
      //reset();
      setTimeout(() => {
        setFormResponse((prevValue) => ({ ...prevValue, message: "" }));
        setRequestIsSuccessful(false);
      }, 500); // Time until CSS transition finishes.
    }
    if (!formIsOpen && formResponse.message) {
      setTimeout(() => {
        setToolsFrontend((prevValue) => [...prevValue, id]);
      }, 500); // Time until CSS transition finishes.
    }
  }, [formIsOpen]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        createRequest({
          urlPath: `/tools/${id}`,
          method: "DELETE",
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
      targetForm={`delete-tool-form-${id}`}
      title="Delete Tool"
      requestIsSuccessful={requestIsSuccessful}
    >
      <Form
        id={`delete-tool-form-${id}`}
        legend="Delete tool form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h5 className={styles.deleteToolModalQuestion}>
          Delete the following tool?
        </h5>
        <ul className={styles.deleteToolModalList}>
          <li className={styles.deleteToolModalListElement}>
            <span className={styles.deleteToolModalListElementTitle}>
              Title:
            </span>{" "}
            {title}
          </li>
          <li className={styles.deleteToolModalListElement}>
            <span className={styles.deleteToolModalListElementTitle}>
              Description:
            </span>{" "}
            {description}
          </li>
        </ul>
      </Form>
    </Modal>
  );
}

export default DeleteToolForm;
