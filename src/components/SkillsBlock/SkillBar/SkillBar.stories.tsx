import type { Meta, StoryObj } from "@storybook/react";

import SkillBar from "./SkillBar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Skills Block/Skill Bar",
  component: SkillBar,
  decorators: [
    (Story) => (
      <div style={{ padding: "3rem", background: "white" }}>
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
    progressPercentage: {
      description: "The percentage of the bar that is filled.",
      type: "number",
    },
    title: {
      description: "Name of the skill.",
      type: "string",
    },
    color: {
      description: "Color of the border of the skill bar.",
    },
    href: {
      description: "Link to an external website describing the skill.",
    },
    isSubLevel: {
      description:
        "Set if the current SkillBar is nested within another SkillBar as its child.",
    },
    isSubLevelWithChild: {
      description:
        "Set if the current SkillBar is nested within another SkillBar as its child, and at the same time it also has children. It should be followed by another sibling (i.e. not its child) SkillBar.",
    },
    children: {
      description:
        "Optional. Additional SkillBar(s) component that is nested within the current SkillBar.",
    },
  },
} satisfies Meta<typeof SkillBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    title: "Test",
    progressPercentage: 75,
    color: "orange",
    href: "#",
    isSubLevel: false,
    isSubLevelWithChild: false,
  },
};

export const WithChild: Story = {
  args: {
    title: "Parent skill",
    progressPercentage: 90,
    color: "red",
    href: "#",
    isSubLevel: false,
    isSubLevelWithChild: false,
    children: (
      <SkillBar
        title="Child skill"
        progressPercentage={80}
        href="#"
        isSubLevel
      />
    ),
  },
};

export const WithChildren: Story = {
  args: {
    title: "Parent skill",
    progressPercentage: 90,
    color: "red",
    href: "#",
    isSubLevel: false,
    isSubLevelWithChild: false,
    children: (
      <>
        <SkillBar
          title="Child skill #1"
          progressPercentage={80}
          href="#"
          isSubLevel
          isSubLevelWithChild
        >
          <SkillBar
            title="Grandchild skill"
            progressPercentage={70}
            href="#"
            isSubLevel
          />
        </SkillBar>
        <SkillBar
          title="Child skill #2"
          progressPercentage={80}
          href="#"
          isSubLevel
        />
      </>
    ),
  },
};
