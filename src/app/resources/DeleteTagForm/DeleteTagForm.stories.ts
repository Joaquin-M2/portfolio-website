import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import DeleteTagForm from "./DeleteTagForm";

const meta = {
  title: "Pages/Resources page/Delete Tag Form",
  component: DeleteTagForm,
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
    setToolsFrontend: {
      description:
        "Forces a rerender of the tools shown on the frontend when a tool is deleted.",
    },
    tags: {
      description: "All tags that can be deleted.",
    },
  },
} satisfies Meta<typeof DeleteTagForm>;

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

export const Base: Story = {
  args: {
    formIsOpen: true,
    //hideModal: () => {},
    resetFormValues: false,
    //setToolsFrontend: () => {},
    tags: randomTags,
  },
};
