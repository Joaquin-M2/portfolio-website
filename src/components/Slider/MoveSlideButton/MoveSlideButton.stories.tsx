import type { Meta, StoryObj } from "@storybook/react";

import MoveSlideButton from "./MoveSlideButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Move Slide Button",
  component: MoveSlideButton,
  decorators: [
    (Story) => (
      <div style={{ height: "30rem" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    additionalStyles: {
      description:
        "Ad hoc CSS class name(s) that we may want to add when using this component.",
      type: "string",
    },
    changeSlide: {
      description: "Action after pressing the button.",
      type: "function",
    },
    leftwardsArrow: {
      description:
        "Sets if the arrow should be leftwards oriented. Default is rightwards.",
      type: "boolean",
    },
  },
} satisfies Meta<typeof MoveSlideButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const RightwardsArrow: Story = {
  args: {
    //additionalStyles: "",
    //changeSlide: () => {},
    //leftwardsArrow: false
  },
};

export const LeftwardsArrow: Story = {
  args: {
    //additionalStyles: "",
    //changeSlide: () => {},
    leftwardsArrow: true,
  },
};
