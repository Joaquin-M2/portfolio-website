import type { Meta, StoryObj } from "@storybook/react";

import Modal from "./Modal";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Modal",
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    acceptButtonIsDisabled: {
      description:
        "If true, darken the color and remove functionality to the 'Accept' button (usually works as a form submit button).",
      type: "boolean",
    },
    acceptButtonTitle: {
      description:
        "Name of the 'Accept' button, such as 'Yes', 'Agree', 'Accept' or whatever the user wants.",
      type: "string",
    },
    backendResponse: {
      control: "object",
      description:
        "Response sent by the backend after submitting the the form related to the modal. It should consist of an object with the properties 'status' and 'message'.",
    },
    cancelButtonTitle: {
      description:
        "Name of the 'Cancel' button, such as 'No', 'Close', 'Cancel' or whatever the user wants.",
      type: "string",
    },
    hideModal: {
      description:
        "Function with any specific logic required to close the modal after the user clicks.",
      type: "function",
    },
    isShown: {
      description: "Set if the modal should be shown or stay hidden.",
      type: "boolean",
    },
    requestIsSuccessful: {
      description:
        "If true, remove the 'Accept' (submit form) button and just leave the 'Close' button.",
      type: "boolean",
    },
    targetForm: {
      description:
        "Id of the form related to this modal component. Required if we want to give the submitting functionality to the modal 'Accept' button.",
      type: "string",
    },
    title: {
      description: "Title of the modal.",
      type: "string",
    },
    children: {
      description: "List elements of the menu.",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    acceptButtonIsDisabled: false,
    acceptButtonTitle: "Accept",
    //backendResponse: { status: 200, message: "Success!" },
    cancelButtonTitle: "Cancel",
    hideModal: () => {},
    isShown: true,
    //requestIsSuccessful: false,
    targetForm: "1",
    title: "Modal title",
    children: <p>Modal content (such as a 'Form') goes here.</p>,
  },
};

export const SuccessfulRequest: Story = {
  args: {
    acceptButtonIsDisabled: false,
    acceptButtonTitle: "Accept",
    backendResponse: { status: 200, message: "Successful backend response!" },
    cancelButtonTitle: "Close",
    hideModal: () => {},
    isShown: true,
    requestIsSuccessful: true,
    targetForm: "1",
    title: "Modal title",
    children: <p>Modal content (such as a 'Form') goes here.</p>,
  },
};

export const FailedRequest: Story = {
  args: {
    acceptButtonIsDisabled: false,
    acceptButtonTitle: "Accept",
    backendResponse: { status: 401, message: "Failed backend response!" },
    cancelButtonTitle: "Close",
    hideModal: () => {},
    isShown: true,
    requestIsSuccessful: false,
    targetForm: "1",
    title: "Modal title",
    children: <p>Modal content (such as a 'Form') goes here.</p>,
  },
};

export const DisabledAcceptButton: Story = {
  args: {
    acceptButtonIsDisabled: true,
    acceptButtonTitle: "Send",
    //backendResponse: { status: 401, message: "Failed request!" },
    cancelButtonTitle: "Close",
    hideModal: () => {},
    isShown: true,
    //requestIsSuccessful: false,
    targetForm: "1",
    title: "Modal title",
    children: (
      <>
        <p style={{ marginBottom: "1rem" }}>
          Modal content (such as a 'Form') goes here.
        </p>
        <p>
          If the user didn't fill all the required form input fields, the Accept
          (Send) button should be disabled.
        </p>
      </>
    ),
  },
};
