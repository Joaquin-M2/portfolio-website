import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import FiltersBar from "./FiltersBar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Filters Bar",
  component: FiltersBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    additionalStyles: {
      control: "text",
      description:
        "Additional CSS class names that may be added to this component.",
    },
    changeFilter: {
      description:
        "Function that uses the enabled buttons to filter the results.",
    },
    filterButtons: {
      control: "object",
      description: "Filters that will be used in the component.",
    },
  },
} satisfies Meta<typeof FiltersBar>;

const randomFilterButtons = Array(10)
  .fill(null)
  .map(() => faker.lorem.word());

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    filterButtons: randomFilterButtons,
  },
};
