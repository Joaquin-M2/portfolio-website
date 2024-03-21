import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import AddResourceForm from "./AddResourceForm";

const meta = {
  title: "Pages/Resources page/Add Resource Form",
  component: AddResourceForm,
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

    handleAddTag: {
      description:
        "Function that handles adding tags from the list to the new tool.",
    },
    handleRemoveTag: {
      description:
        "Function that handles removing tags from those that were selected for the new tool.",
    },
    hideModal: {
      description: "Function that closes the modal.",
    },
    icons: {
      description: "All available icons.",
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
    selectedTagsAddToolForm: {
      description: "Tags that were selected for the tool to be added.",
    },
    setToolsFrontend: {
      description:
        "Forces a rerender of the tools shown on the frontend when a tool is deleted.",
    },
    tags: {
      description: "All available tags that are already added.",
    },
  },
} satisfies Meta<typeof AddResourceForm>;

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

const selectedTags = [randomTags[1]];

const randomIconsSet = new Set(
  Array(20)
    .fill(null)
    .map(() => faker.lorem.words({ min: 1, max: 3 }))
);

const randomIcons = [...randomIconsSet]
  .sort((a, b) => a.localeCompare(b))
  .map((iconName) => ({
    name: iconName,
    url: faker.image.urlLoremFlickr({ width: 60, height: 60 }),
    _id: faker.string.uuid(),
  }));

export const Base: Story = {
  args: {
    formIsOpen: true,
    //handleAddTag: () => {},
    //handleRemoveTag: () => {},
    //hideModal: () => {},
    icons: randomIcons,
    requestMethod: "POST",
    requestUrlPath: "/path/to/backend/endpoint",
    resetFormValues: false,
    selectedTagsAddToolForm: selectedTags,
    //setToolsFrontend: () => {},
    tags: randomTags,
  },
};
