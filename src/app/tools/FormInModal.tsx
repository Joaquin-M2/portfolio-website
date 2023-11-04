import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";
import Modal from "../../components/Modal/Modal";
import { emailRegExp } from "../../utils/email-regexp";
import { createRequest } from "../../utils/requests";

interface FormInModalProps {
  children?: JSX.Element | JSX.Element[];
  formIsOpen: boolean;
  formType: "login" | "signup" | "delete-tool";
  hideModal: MouseEventHandler;
  id?: string;
  resetFormValues?: boolean;
  requestMethod: string;
  requestUrlPath: string;
  setToolsFrontend?: Dispatch<SetStateAction<any[]>>;
}

interface FormInputs {
  email: string;
  password: string;
}

function FormInModal({
  children,
  formIsOpen,
  formType,
  hideModal,
  id,
  requestMethod,
  requestUrlPath,
  resetFormValues,
  setToolsFrontend,
}: FormInModalProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  const [requestIsSuccessful, setRequestIsSuccessful] = useState(false);
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
    case "delete-tool":
      modalTitle = "Delete Tool";
      //formLegend = "Delete tool form";
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

      // Éste es un prop que está cambiando y por tanto re-renderiza el componente.

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

  return (
    <Modal
      backendResponse={formResponse}
      isShown={formIsOpen}
      hideModal={hideModal}
      targetForm={`${formType}-form-${id}`}
      title={modalTitle}
      requestIsSuccessful={requestIsSuccessful}
    >
      <Form
        hasFieldset
        id={`${formType}-form-${id}`}
        legend={formLegend}
        onSubmit={handleSubmit(onSubmit)}
        resetFormValues={resetFormValues}
      >
        {(formType === "login" || formType === "signup") && (
          <>
            <Input
              aria-invalid={errors.email ? true : false}
              watchedValue={watch("email")}
              error={
                errors.email && "Invalid email. Accepted format: ****@****.**"
              }
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
          </>
        )}
        <>{children}</>
      </Form>
    </Modal>
  );
}

export default FormInModal;
