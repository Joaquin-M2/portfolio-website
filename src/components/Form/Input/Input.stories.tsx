import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import Input from "./Input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Input",
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ padding: "3rem", background: "white" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    handleAddTag: {
      description:
        "Function to handle adding tags (usually for filtering purposes).",
      type: "function",
    },
    selectedTagsAddToolForm: {
      control: "object",
      description:
        "Tags that were selected for a new tool in the 'Add new tool' form.",
    },
    error: {
      description: "Error message thrown if the input value is not valid.",
      type: "string",
    },
    formIsOpen: {
      description:
        "If the form is closed (i.e. a modal) the input will have a specific behavior (e.g. reset its value).",
      type: "boolean",
    },
    handleRemoveTag: {
      description:
        "Function that deals with removing tags when creating a tool.",
      type: "function",
    },
    id: {
      description: "Id for the input.",
      type: "string",
    },
    placeholder: {
      description:
        "Placeholder for the input. It will also be used as label when the input has a value.",
      type: "string",
    },
    allOptions: {
      control: "object",
      description:
        "If the input consists of a list of options, this property provides those options.",
    },
    /* toolTags: {
      control: "object",
      description: "Every tag that the user can select to filter the results.",
    }, */
    type: {
      description:
        "Type of input: email, url, text, textarea, password, select single, select multiple...",
      type: "string",
    },
    watchedValue: {
      description:
        "Value set by the user. Used to check the validity of the input before submitting the form. It is related to the 'React Hook Form' library.",
      type: "string",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const randomTagsSet = new Set(
  Array(20)
    .fill(null)
    .map(() => faker.vehicle.manufacturer())
);

const randomTags = [...randomTagsSet]
  .sort((a, b) => a.localeCompare(b))
  .map((tagName) => ({
    name: tagName,
    _id: faker.string.uuid(),
  }));

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Email",
    id: "1",
    //error: "Invalid email",
    formIsOpen: true,
    watchedValue: "",
  },
};

export const EmailSuccess: Story = {
  args: {
    type: "email",
    placeholder: "Email",
    id: "1",
    //error: "Invalid email",
    formIsOpen: true,
    watchedValue: "email@test.com",
  },
};

export const EmailError: Story = {
  args: {
    type: "email",
    placeholder: "Email",
    id: "1",
    error: "Invalid email",
    formIsOpen: true,
    watchedValue: "email@test",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password",
    id: "1",
    formIsOpen: true,
    watchedValue: "",
  },
};

export const SelectMultiple: Story = {
  args: {
    type: "selectMultiple",
    placeholder: "Select Multiple",
    id: "1",
    formIsOpen: true,
    watchedValue: "",
    allOptions: randomTags,
  },
};

export const SelectSingle: Story = {
  args: {
    type: "selectSingle",
    placeholder: "Select Single",
    id: "1",
    formIsOpen: true,
    watchedValue: "",
    allOptions: randomTags,
  },
};

export const Text: Story = {
  args: {
    type: "text",
    placeholder: "Text",
    id: "1",
    formIsOpen: true,
    watchedValue: "",
  },
};

export const TextArea: Story = {
  args: {
    type: "textarea",
    placeholder: "Long text",
    id: "1",
    formIsOpen: true,
    watchedValue: "",
  },
};

export const Url: Story = {
  args: {
    type: "url",
    placeholder: "URL",
    id: "1",
    formIsOpen: true,
    watchedValue: "",
  },
};
