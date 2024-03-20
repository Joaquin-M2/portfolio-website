import type { Meta, StoryObj } from "@storybook/react";
//import { faker } from "@faker-js/faker";

import UpdateUserForm from "./UpdateUserForm";

const meta = {
  title: "Pages/Tools page/Update User Form",
  component: UpdateUserForm,
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
    hideModal: {
      description: "Function that closes the modal.",
    },
    resetFormValues: {
      description: "Sets if the inputs in the form should be reset.",
    },
  },
} satisfies Meta<typeof UpdateUserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    formIsOpen: true,
    //hideModal: () => {},
    resetFormValues: false,
  },
};
