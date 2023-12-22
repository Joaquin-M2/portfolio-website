import type { Meta, StoryObj } from "@storybook/react";

import Alert from "./Alert";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Alert",
  component: Alert,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backendResponse: {
      description:
        "Response received from the backend. It should have at least the 'status' and 'message' properties.",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Success: Story = {
  args: {
    backendResponse: {
      status: 201,
      message: "Success!",
    },
  },
};

export const Error: Story = {
  args: {
    backendResponse: {
      status: 500,
      message: "Error!",
    },
  },
};
