import type { Meta, StoryObj } from "@storybook/react";

import DeleteToolForm from "./DeleteToolForm";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/ToolCard/Delete Tool Form",
  component: DeleteToolForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    description: {
      description: "Description of the tool to be deleted.",
    },
    formIsOpen: {
      description: "Checks if the modal form is open.",
    },
    hideModal: {
      description: "Function that closes the modal.",
    },
    id: {
      description: "Id of the tool to delete.",
    },
    setToolsFrontend: {
      description:
        "Forces a rerender of the tools shown on the frontend when a tool is deleted.",
    },
    title: {
      description: "Title of the tool to be deleted.",
    },
  },
} satisfies Meta<typeof DeleteToolForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    description: "Tool description.",
    formIsOpen: true,
    //hideModal: () => {},
    id: "1",
    //setToolsFrontend: () => {},
    title: "Tool title",
  },
};
