import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import ToolCard from "./ToolCard";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/ToolCard",
  component: ToolCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backendResponseDeleteTool: {
      description:
        "Response provided by the backend when sending a DELETE request to delete a tool.",
    },
    setDeleteToolModalIsShown: {
      description: "Sets if the 'Delete tool' modal is shown.",
      type: "function",
    },
    setUpdateToolModalIsShown: {
      description: "Sets if the 'Update tool' modal is shown.",
      type: "function",
    },
    deleteToolModalIsShown: {
      description: "State of the 'Delete tool' modal visibility.",
      type: "boolean",
    },
    updateToolModalIsShown: {
      description: "State of the 'Delete tool' modal visibility.",
      type: "boolean",
    },
    description: {
      description: "Description of the tool.",
      type: "string",
    },
    handleAddTag: {
      description:
        "When updating a tool, this function deals with adding a new tag.",
      type: "function",
    },
    handleRemoveTag: {
      description:
        "When updating a tool, this function deals with deleting a tag.",
      type: "function",
    },
    hideDeleteToolModal: {
      description: "Manages closing the 'Delete tool' modal.",
      type: "function",
    },
    hideUpdateToolModal: {
      description: "Manages closing the 'Update tool' modal.",
      type: "function",
    },
    id: {
      description: "Id of the tool.",
      type: "string",
    },
    logo: {
      description: "Logo of the tool.",
    },
    setToolsFrontend: {
      description: "Forces a rerender of the tools shown on the frontend.",
      type: "function",
    },
    selectedTagsAddToolForm: {
      description:
        "When updating a tool, the newly selected tags for that tool.",
    },
    allOptions: {
      description: "Available tags for a tool that we may want to update.",
    },
    toolTags: {
      description: "Tags given to a tool.",
    },
    title: {
      description: "Tool title.",
      type: "string",
    },
    userAllFavoriteTools: {
      description: "Tools set as favorite by the user.",
    },
    url: {
      description: "Link to the tool website.",
      type: "string",
    },
  },
} satisfies Meta<typeof ToolCard>;

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

const selectedTags = randomTags.splice(3, 5);

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  loaders: [
    () => {
      window.localStorage.removeItem("userToken");
    },
  ],
  args: {
    //backendResponseDeleteTool: { status: 201, message: 'Success!' },
    setDeleteToolModalIsShown: () => {},
    setUpdateToolModalIsShown: () => {},
    deleteToolModalIsShown: false,
    updateToolModalIsShown: false,
    description: faker.lorem.paragraph(),
    handleAddTag: () => {},
    handleRemoveTag: () => {},
    hideDeleteToolModal: () => {},
    hideUpdateToolModal: () => {},
    id: "1",
    logo: faker.image.urlLoremFlickr({ width: 60, height: 60 }),
    //setToolsFrontend: () => {},
    selectedTagsAddToolForm: [],
    allOptions: randomTags,
    toolTags: selectedTags,
    title: "Tool title",
    userAllFavoriteTools: [],
    url: "#",
  },
};

export const UserIsAdmin: Story = {
  loaders: [
    () => {
      window.localStorage.setItem(
        "userToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHBmLXdlYnNpdGUuY29tIiwidXNlcklkIjoiNjUyZjZlNDNmMGMzZDI4OTg2ZGM1NjAwIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAyNjY3MzAzLCJleHAiOjE3MDI2NzA5MDN9.hUkLLwQsbBs4Zugd748otj2AFTR7On_cTHBscYSZiOg"
      );
    },
  ],
  args: {
    //backendResponseDeleteTool: { status: 201, message: 'Success!' },
    setDeleteToolModalIsShown: () => {},
    setUpdateToolModalIsShown: () => {},
    deleteToolModalIsShown: false,
    updateToolModalIsShown: false,
    description: faker.lorem.paragraph(),
    handleAddTag: () => {},
    handleRemoveTag: () => {},
    hideDeleteToolModal: () => {},
    hideUpdateToolModal: () => {},
    id: "1",
    logo: faker.image.urlLoremFlickr({ width: 60, height: 60 }),
    //setToolsFrontend: () => {},
    selectedTagsAddToolForm: [],
    allOptions: randomTags,
    toolTags: selectedTags,
    title: "Tool title",
    userAllFavoriteTools: [],
    url: "#",
  },
};
