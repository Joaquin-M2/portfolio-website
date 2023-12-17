import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import AddIconForm from "./AddIconForm";

const meta = {
  title: "Pages/Tools page/Add Icon Form",
  component: AddIconForm,
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
    icons: {
      description:
        "Elements (icons + their names) that will be displayed on the list for the user to select.",
    },
  },
} satisfies Meta<typeof AddIconForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const randomTagsSet = new Set(
  Array(20)
    .fill(null)
    .map(() => faker.vehicle.manufacturer())
);

const randomIcons = [...randomTagsSet]
  .sort((a, b) => a.localeCompare(b))
  .map((tagName) => ({
    name: tagName,
    url: faker.image.urlLoremFlickr({ width: 60, height: 60 }),
    _id: faker.string.uuid(),
  }));

export const Base: Story = {
  args: {
    formIsOpen: true,
    //hideModal: () => {},
    resetFormValues: false,
    //setToolsFrontend: () => {},
    icons: randomIcons,
  },
};
