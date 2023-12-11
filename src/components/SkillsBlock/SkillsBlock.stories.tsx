import type { Meta, StoryObj } from "@storybook/react";

import SkillsBlock from "./SkillsBlock";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Skills Block",
  component: SkillsBlock,
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
    children: {
      description:
        "Content of the block. Usually it is a group of 'ul', 'li' and 'SkillBar' elements.",
    },
  },
} satisfies Meta<typeof SkillsBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    //additionalStyles: "",
    children: (
      <p>
        Content of the block. Usually it is a group of 'ul', 'li' and 'SkillBar'
        elements.
      </p>
    ),
  },
};
