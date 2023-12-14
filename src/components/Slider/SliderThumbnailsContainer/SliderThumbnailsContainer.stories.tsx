import type { Meta, StoryObj } from "@storybook/react";

import SliderThumbnailsContainer from "./SliderThumbnailsContainer";
import SliderThumbnail from "./SliderThumbnail/SliderThumbnail";
import {
  Selected,
  Unselected,
} from "./SliderThumbnail/SliderThumbnail.stories";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Slider Thumbnails Container",
  component: SliderThumbnailsContainer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      description:
        "'SliderThumbnail' components that will be contained by this component.",
    },
  },
} satisfies Meta<typeof SliderThumbnailsContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    children: (
      <>
        {/* Storybook doesn't detect 'updateStateForActiveThumbnail' arg from 'SliderThumbnail' stories. */}
        <SliderThumbnail
          {...Selected.args}
          updateStateForActiveThumbnail={() => {}}
        />
        <SliderThumbnail
          {...Unselected.args}
          updateStateForActiveThumbnail={() => {}}
        />
      </>
    ),
  },
};
