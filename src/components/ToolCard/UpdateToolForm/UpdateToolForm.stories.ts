import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import UpdateToolForm from "./UpdateToolForm";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/ToolCard/Update Tool Form",
  component: UpdateToolForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    allOptions: {
      description: "Description of the tool to be deleted.",
    },
    formIsOpen: {
      description: "Checks if the modal form is open.",
    },
    handleAddTag: {
      description: "Function that adds a tag to the form.",
    },
    handleRemoveTag: {
      description: "Function that removes a tag from the form..",
    },
    hideModal: {
      description: "Function with the action that closes the modal.",
    },
    id: {
      description: "Id of the tool to delete.",
    },
    requestMethod: {
      description:
        "Method that will be used in the request to the backend when sending the form.",
    },
    requestUrlPath: {
      description: "Path to which the form request will be sent to.",
    },
    selectedTagsAddToolForm: {
      description:
        "Selected tags that will be used on the tool when it is updated.",
    },
    setToolsFrontend: {
      description:
        "Forces a rerender of the tools shown on the frontend when a tool is deleted.",
    },
  },
} satisfies Meta<typeof UpdateToolForm>;

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

//const selectedTags = randomTags.splice(3, 5);

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    allOptions: randomTags,
    formIsOpen: true,
    //handleAddTag: () => {},
    //handleRemoveTag: () => {},
    //hideModal: () => {},
    id: "1",
    requestMethod: "PATCH",
    requestUrlPath: "/path/to/backend/endpoint",
    selectedTagsAddToolForm: [],
    //setToolsFrontend: () => {},
  },
};
