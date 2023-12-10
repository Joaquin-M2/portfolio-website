import type { Meta, StoryObj } from "@storybook/react";

import SkillBar from "./SkillBar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Skill Bar",
  component: SkillBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    progressPercentage: {
      description: "The percentage of the bar that is filled.",
      type: "number",
    },
    children: {
      description: "Title of the skill bar.",
      type: "string",
    },
  },
} satisfies Meta<typeof SkillBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    progressPercentage: 75,
    children: "Skill bar title",
  },
};
