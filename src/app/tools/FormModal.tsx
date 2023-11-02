import { MouseEventHandler, useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";
import Modal from "../../components/Modal/Modal";
import { emailRegExp } from "../../utils/email-regexp";
import { createRequest } from "../../utils/requests";

interface FormModalProps {
  formIsOpen: boolean;
  formType: "login" | "signup";
  hideModal: MouseEventHandler;
  isShown: boolean;
  resetFormValues: boolean;
  requestMethod: string;
  requestUrlPath: string;
}

interface FormInputs {
  email: string;
  password: string;
}

function FormModal({
  formIsOpen,
  formType,
  hideModal,
  isShown,
  requestMethod,
  requestUrlPath,
  resetFormValues,
}: FormModalProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  let modalTitle;
  let formLegend;
  switch (formType) {
    case "login":
      modalTitle = "Log In";
      formLegend = "Log in form";
      break;
    case "signup":
      modalTitle = "Sign Up";
      formLegend = "Sign up form";
      break;
    default:
      modalTitle = "Form";
      formLegend = "Form";
      break;
  }

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
        localStorage.setItem("userToken", result.token);
      }
    } catch (error) {
      setFormResponse({
        status: 500,
        message: error.message,
      });
      throw error.message;
    }
  };

  useEffect(() => {
    if (!formIsOpen) {
      reset();
      setFormResponse((prevValue) => ({ ...prevValue, message: "" }));
    }
  }, [formIsOpen]);

  return (
    <Modal
      backendResponse={formResponse}
      isShown={isShown}
      hideModal={hideModal}
      targetForm={`${formType}-form`}
      title={modalTitle}
    >
      <Form
        hasFieldset
        id={`${formType}-form`}
        legend={formLegend}
        onSubmit={handleSubmit(onSubmit)}
        resetFormValues={resetFormValues}
      >
        <Input
          aria-invalid={errors.email ? true : false}
          watchedValue={watch("email")}
          error={errors.email && "Invalid email. Accepted format: ****@****.**"}
          formIsOpen={formIsOpen}
          id={`${formType}-email-input`}
          placeholder="Email"
          required
          type="email"
          {...register("email", { required: true, pattern: emailRegExp })}
        />
        <Input
          aria-invalid={errors.password ? true : false}
          watchedValue={watch("password")}
          error={
            errors.password &&
            "Password needs to be between 6 and 20 characters."
          }
          formIsOpen={formIsOpen}
          id={`${formType}-password-input`}
          placeholder="Password"
          required
          type="password"
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 20,
          })}
        />
      </Form>
    </Modal>
  );
}

export default FormModal;
