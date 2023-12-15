import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import Tag from "./Tag";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Tag",
  component: Tag,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    isFilterButton: {
      description:
        "Set if it is a clickable button or just an informative tag.",
      type: "boolean",
    },
    handleRemoveFilterTag: {
      description:
        "Function to set the behavior when the tag (as a filter button) is clicked.",
      type: "function",
    },
    children: {
      description: "Text in the button.",
      type: "string",
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    isFilterButton: false,
    handleRemoveFilterTag: () => {},
    children: faker.lorem.word(),
  },
};

export const Button: Story = {
  args: {
    isFilterButton: true,
    handleRemoveFilterTag: () => {},
    children: faker.lorem.word(),
  },
};
