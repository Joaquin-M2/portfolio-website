import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import LoginAndSignupForms from "./LoginAndSignupForms";

const meta = {
  title: "Pages/Resources page/Login and Signup forms",
  component: LoginAndSignupForms,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    formIsOpen: {
      description: "Checks if the modal form is open.",
    },
    formType: {
      description: "Decides which type of form will be used (Login or Signup).",
    },
    hideModal: {
      description: "Function that closes the modal.",
    },
    requestMethod: {
      description:
        "Request method that will be used when sending the form request.",
    },
    requestUrlPath: {
      description: "Endpoint path to which the request will be sent.",
    },
    resetFormValues: {
      description: "Sets if the inputs in the form should be reset.",
    },
  },
} satisfies Meta<typeof LoginAndSignupForms>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    formIsOpen: true,
    formType: "login",
    //hideModal: () => {},
    requestMethod: "POST",
    requestUrlPath: "/path/to/backend/endpoint",
    resetFormValues: false,
  },
};

export const Signup: Story = {
  args: {
    formIsOpen: true,
    formType: "signup",
    //hideModal: () => {},
    requestMethod: "POST",
    requestUrlPath: "/path/to/backend/endpoint",
    resetFormValues: false,
  },
};
