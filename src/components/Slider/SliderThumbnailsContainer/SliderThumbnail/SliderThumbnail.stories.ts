import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import SliderThumbnail from "./SliderThumbnail";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Slider Thumbnails Container/Slider Thumbnail",
  component: SliderThumbnail,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    image: {
      description: "Path of the image to load as thumbnail.",
      type: "string",
    },
    updateStateForActiveThumbnail: {
      description:
        "Function that sets what is the current active (selected) thumbnail.",
      type: "function",
    },
    setButtonIsChecked: {
      description: "Sets if the thumbnail is selected.",
      type: "boolean",
    },
  },
} satisfies Meta<typeof SliderThumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Selected: Story = {
  args: {
    image: faker.image.urlLoremFlickr(),
    updateStateForActiveThumbnail: () => {},
    setButtonIsChecked: true,
  },
};

export const Unselected: Story = {
  args: {
    image: faker.image.urlLoremFlickr(),
    updateStateForActiveThumbnail: () => {},
    setButtonIsChecked: false,
  },
};
