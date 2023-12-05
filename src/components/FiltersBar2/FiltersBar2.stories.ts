import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import FiltersBar2 from "./FiltersBar2";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Filters Bar 2",
  component: FiltersBar2,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    filterBySearchFunction: {
      description: "Function to filter the results through the 'Search' input.",
      type: "function",
    },
    filterByTagFunction: {
      description:
        "Function to filter the results through the selection of tags.",
      type: "function",
    },
    handleRemoveFilterTag: {
      description: "Function to remove selected tags from the filter.",
      type: "function",
    },
    selectedFilterTags: {
      control: "object",
      description: "Tags selected by the user to filter the results.",
    },
    tags: {
      control: "object",
      description: "Every tag that the user can select to filter the results.",
    },
  },
} satisfies Meta<typeof FiltersBar2>;

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

const selectedTags = randomTags.splice(3, 5).map((tag) => tag.name);

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    selectedFilterTags: selectedTags,
    tags: randomTags,
  },
};
