import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createRequest } from "../../utils/requests";
import Input from "../../components/Form/Input/Input";
import { emailRegExp } from "../../utils/regular-expressions";
import Form from "../../components/Form/Form";
import Modal from "../../components/Modal/Modal";
import getUserTokenData from "../../utils/get-user-token-data";

interface LoginAndSignupFormsProps {
  formIsOpen: boolean;
  formType: "login" | "signup";
  hideModal: MouseEventHandler;
  id?: string;
  requestMethod: string;
  requestUrlPath: string;
  resetFormValues?: boolean;
  setToolsFrontend?: Dispatch<SetStateAction<any[]>>;
}

interface FormInputs {
  email: string;
  password: string;
}

function LoginAndSignupForms({
  formIsOpen,
  formType,
  hideModal,
  id,
  requestMethod,
  requestUrlPath,
  resetFormValues,
  setToolsFrontend,
}: LoginAndSignupFormsProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });
  const [requestIsSuccessful, setRequestIsSuccessful] = useState(false);
  const [acceptButtonIsDisabled, setAcceptButtonIsDisabled] = useState(false);
  const [acceptButtonTitle, setAcceptButtonTitle] = useState("Accept");

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
      setAcceptButtonIsDisabled(true);
      setAcceptButtonTitle("Loading...");
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
          // If tools are favorited before logging in, they are kept after logging in:
          const accountFavoriteToolsId = JSON.parse(
            localStorage.getItem("accountFavoriteToolsId") || "[]"
          );
          accountFavoriteToolsId.unshift(...result.favoriteTools);
          localStorage.setItem(
            "accountFavoriteToolsId",
            JSON.stringify([...new Set(accountFavoriteToolsId)])
          );
          // Save into the user account those tools that were favorited before logging in:
          if (accountFavoriteToolsId.length > result.favoriteTools.length) {
            fetch(
              createRequest({
                urlPath: `/user/${getUserTokenData("userId")}`,
                method: "PATCH",
                requestBody: { favoriteTools: accountFavoriteToolsId },
              })
            );
          }
        }
      }
      setAcceptButtonIsDisabled(false);
      setAcceptButtonTitle("Accept");
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
      acceptButtonIsDisabled={acceptButtonIsDisabled}
      acceptButtonTitle={acceptButtonTitle}
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
        <Input
          aria-invalid={errors.email ? true : false}
          watchedValue={watch("email")}
          error={
            errors.email &&
            "Invalid email. Accepted format: <username>@<domain>"
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
      </Form>
    </Modal>
  );
}

export default LoginAndSignupForms;
