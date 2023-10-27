import React, { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";
import { emailRegExp } from "../../utils/email-regexp";

interface LogInFormProps {
  resetFormValues: boolean;
  formIsOpen: boolean;
}

interface LogInInputs {
  email: string;
  password: string;
}

function LogInForm({ resetFormValues, formIsOpen }: LogInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<LogInInputs>();

  const onSubmit: SubmitHandler<LogInInputs> = (data) => console.log(data);

  useEffect(() => {
    if (!formIsOpen) reset();
  }, [formIsOpen]);

  return (
    <Form
      hasFieldset
      id="login-form"
      legend="Log in form"
      onSubmit={handleSubmit(onSubmit)}
      resetFormValues={resetFormValues}
    >
      <Input
        aria-invalid={errors.email ? true : false}
        watchedValue={watch("email")}
        error={errors.email && "Invalid email. Accepted format: ****@****.**"}
        formIsOpen={formIsOpen}
        id="email-input"
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
        id="password-input"
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
  );
}

export default LogInForm;