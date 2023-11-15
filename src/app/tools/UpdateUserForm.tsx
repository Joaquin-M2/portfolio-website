"use client";

import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { createRequest } from "../../utils/requests";

import styles from "./tools.module.scss";

interface UpdateUserFormProps {
  formIsOpen: boolean;
  hideModal: MouseEventHandler;
  id?: string;
  resetFormValues?: boolean;
}

interface FormInputs {
  email: string;
  role: string;
}

function UpdateUserForm({
  formIsOpen,
  hideModal,
  id,
  resetFormValues,
}: UpdateUserFormProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  const [users, setUsers] = useState([]);
  const [usersFrontend, setUsersFrontend] = useState([]);
  const selectSingleInput = useRef<HTMLSelectElement>();
  const USER_ROLES = ["admin", "user"];

  useEffect(() => {
    if (users.length) {
      setValue("email", selectSingleInput.current.selectedOptions[0].innerText);
    }
  }, [users]);

  useEffect(() => {
    if (formIsOpen) {
      fetch(createRequest({ urlPath: "/user" }))
        .then((response) => response.json())
        .then((data) => {
          setUsers(data.users);
        })
        .catch((error) => console.log(error));
    }
    if (!formIsOpen) {
      reset();
      setTimeout(() => {
        setFormResponse((prevValue) => ({ ...prevValue, message: "" }));
      }, 500); // Time until CSS transition finishes.
    }
  }, [formIsOpen, usersFrontend]);

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
          urlPath: `/user/${selectSingleInput.current.value}`,
          method: "PATCH",
          requestBody: data,
        })
      );

      const result = await response.json();

      setFormResponse({
        status: response.status,
        message: result.message,
      });

      setUsersFrontend((prevValue) => [...prevValue, id]);
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
      targetForm={`update-user-form-${id}`}
      title="Update User"
    >
      <Form
        hasFieldset
        id={`update-user-form-${id}`}
        legend="Update user form"
        onSubmit={handleSubmit(onSubmit)}
        resetFormValues={resetFormValues}
      >
        <div className={styles.smallFormInnerContainer}>
          <div className={styles.smallFormInnerContainerSection}>
            <Input
              allOptions={users}
              formIsOpen={formIsOpen}
              placeholder="Choose user"
              type="selectSingle"
              ref={selectSingleInput}
              onChange={() => {
                setValue(
                  "email",
                  selectSingleInput.current.selectedOptions[0].innerText
                );
                setValue(
                  "role",
                  users.find(
                    (user) =>
                      user.email ===
                      selectSingleInput.current.selectedOptions[0].innerText
                  ).role
                );
              }}
            />
          </div>
          <div className={styles.smallFormInnerContainerSection}>
            <Input
              aria-invalid={errors.email ? true : false}
              watchedValue={watch("email")}
              error={
                errors.email &&
                "User email needs to be between 2 and 50 characters."
              }
              formIsOpen={formIsOpen}
              id="update-user-title-input"
              placeholder="Update user email"
              required
              type="text"
              {...register("email", {
                required: true,
                minLength: 2,
                maxLength: 50,
              })}
            />
            <Input
              allOptions={USER_ROLES}
              watchedValue={watch("role")}
              formIsOpen={formIsOpen}
              id="update-user-role-input"
              placeholder="Update user role"
              required
              type="selectSingle"
              {...register("role", {
                required: true,
              })}
            />
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default UpdateUserForm;
