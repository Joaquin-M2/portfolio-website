import React, { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";
import { emailRegExp } from "../../utils/email-regexp";
import { createRequest } from "../../utils/requests";

import styles from "./signUpForm.module.scss";

interface SignUpFormProps {
  resetFormValues: boolean;
  formIsOpen: boolean;
}

interface SignUpInputs {
  email: string;
  password: string;
}

function SignUpForm({ resetFormValues, formIsOpen }: SignUpFormProps) {
  const [formResponse, setFormResponse] = useState({
    status: 500,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SignUpInputs>();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    try {
      const response = await fetch(
        createRequest({
          urlPath: "/user/signup",
          method: "POST",
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
    <Form
      hasFieldset
      id="signup-form"
      legend="Sign up form"
      onSubmit={handleSubmit(onSubmit)}
      resetFormValues={resetFormValues}
    >
      <Input
        aria-invalid={errors.email ? true : false}
        watchedValue={watch("email")}
        error={errors.email && "Invalid email. Accepted format: ****@****.**"}
        formIsOpen={formIsOpen}
        id="signup-email-input"
        placeholder="Email"
        required
        type="email"
        {...register("email", { required: true, pattern: emailRegExp })}
      />
      <Input
        aria-invalid={errors.password ? true : false}
        watchedValue={watch("password")}
        error={
          errors.password && "Password needs to be between 6 and 20 characters."
        }
        formIsOpen={formIsOpen}
        id="signup-password-input"
        placeholder="Password"
        required
        type="password"
        {...register("password", {
          required: true,
          minLength: 6,
          maxLength: 20,
        })}
      />
      <p
        className={`${styles.formMessage} ${
          +formResponse.status >= 400
            ? styles.formMessageError
            : styles.formMessageSuccess
        }`}
      >
        {formResponse.message}
      </p>
    </Form>
  );
}

export default SignUpForm;
