import type { Meta, StoryObj } from "@storybook/react";

import Form from "./Form";
import Modal from "@/components/Modal/Modal";
import Input from "@/components/Form/Input/Input";
import { Email, Password } from "./Input/Input.stories";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Form",
  component: Form,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    hasFieldset: {
      description: "Set if the form uses a fieldset.",
      type: "boolean",
    },
    id: {
      description: "Id of the form.",
      type: "string",
    },
    legend: {
      description:
        "Legend of the form, in case we want to assign one to the form.",
      type: "string",
    },
    onSubmit: {
      description: "What happens when the form is submitted.",
      type: "function",
    },
    resetFormValues: {
      description: "Set all form inputs back to empty.",
      type: "boolean",
    },
    children: {
      description: "Content of the form. Usually 'Input' components go here.",
    },
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    hasFieldset: true,
    id: "1",
    legend: "Form",
    onSubmit: () => {},
    resetFormValues: false,
    children: <p>"Input" components should go here.</p>,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "3rem", background: "white" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithinModal: Story = {
  args: {
    hasFieldset: true,
    id: "1",
    legend: "Form within Modal",
    onSubmit: (e) => {
      e.preventDefault();
    },
    resetFormValues: false,
    children: (
      <div style={{ padding: "3rem" }}>
        <p style={{ marginBottom: "1rem" }}>
          "Input" components should go here.
        </p>
        <p>
          This story uses the "Modal" component as container of "Form" instead
          of a div (as it happens in the Base story).
        </p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <Modal
        backendResponse={{ status: 200, message: "" }}
        isShown={true}
        hideModal={() => {}}
        targetForm="1"
        title="<Modal> wrapping <Form>"
      >
        <Story />
      </Modal>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export const WithinModalWithInputs: Story = {
  args: {
    hasFieldset: true,
    id: "1",
    legend: "Form with Inputs",
    onSubmit: (e) => {
      e.preventDefault();
    },
    resetFormValues: false,
    children: (
      <div style={{ padding: "0 3rem" }}>
        <Input {...Email.args} />
        <Input {...Password.args} />
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <Modal
        backendResponse={{ status: 200, message: "" }}
        isShown={true}
        hideModal={() => {}}
        targetForm="1"
        title="<Modal> wrapping <Form>"
      >
        <Story />
      </Modal>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};
