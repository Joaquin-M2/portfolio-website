"use client";

import React, { MouseEventHandler, useEffect, useRef, useState } from "react";

import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input/Input";
import Modal from "@/components/Modal/Modal";

import { createRequest } from "@/utils/requests";

import styles from "../resources.module.scss";

interface DeleteUserFormProps {
  formIsOpen: boolean;
  hideModal: MouseEventHandler;
  resetFormValues: boolean;
}

function DeleteUserForm({
  formIsOpen,
  hideModal,
  resetFormValues,
}: DeleteUserFormProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  const selectSingleInput = useRef<HTMLSelectElement>();
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [usersFrontend, setUsersFrontend] = useState([]);

  useEffect(() => {
    if (users.length) {
      setSelectedUserEmail(
        selectSingleInput.current.selectedOptions[0].innerText
      );
    }
  }, [users]);

  useEffect(() => {
    if (!formIsOpen) {
      setTimeout(() => {
        setFormResponse((prevValue) => ({ ...prevValue, message: "" }));
      }, 500); // Time until CSS transition finishes.
    }
    if (formIsOpen) {
      fetch(createRequest({ urlPath: "/user" }))
        .then((response) => response.json())
        .then((data) => {
          setUsers(data.users);
        })
        .catch((error) => console.log(error));
    }
  }, [formIsOpen, usersFrontend]);

  const onSubmit = async () => {
    try {
      const response = await fetch(
        createRequest({
          urlPath: `/user/${selectSingleInput.current.value}`,
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
          setSelectedUserEmail(
            (
              selectSingleInput.current.selectedOptions[0]
                .nextElementSibling as HTMLElement
            ).innerText
          );
        } else {
          setSelectedUserEmail(
            (
              selectSingleInput.current.selectedOptions[0]
                .parentElement[0] as HTMLElement
            ).innerText
          );
        }
      }
      setUsersFrontend((prevValue) => [...prevValue]);
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
      targetForm={`delete-user-form`}
      title="Delete User"
    >
      <Form
        hasFieldset
        id={`delete-user-form`}
        legend="Delete user form"
        onSubmit={async (e) => {
          e.preventDefault();
          onSubmit();
        }}
        resetFormValues={resetFormValues}
      >
        <div className={styles.smallFormInnerContainerVertical}>
          <Input
            allOptions={users}
            formIsOpen={formIsOpen}
            placeholder="Choose user"
            type="selectSingle"
            ref={selectSingleInput}
            onChange={() => {
              setSelectedUserEmail(
                selectSingleInput.current.selectedOptions[0].innerText
              );
            }}
          />
          {selectedUserEmail && (
            <p className={styles.deleteUserQuestion}>
              Delete user "
              <span className={styles.userEmail}>{selectedUserEmail}</span>"?
            </p>
          )}
        </div>
      </Form>
    </Modal>
  );
}

export default DeleteUserForm;
