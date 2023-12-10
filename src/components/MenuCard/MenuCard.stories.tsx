import type { Meta, StoryObj } from "@storybook/react";

import MenuCard from "./MenuCard";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Menu Card",
  component: MenuCard,
  decorators: [
    (Story) => (
      <div
        style={{ padding: "3rem", background: "white", position: "relative" }}
      >
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
    isVisible: {
      description: "Set if the menu should be shown or stay hidden.",
      type: "boolean",
    },
    position: {
      description:
        "Relative position regarding the element where the user should click to open the menu.",
      type: "string",
    },
    children: {
      description: "List elements of the menu.",
    },
  },
} satisfies Meta<typeof MenuCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    isVisible: true,
    children: (
      <>
        <li>Menu element #1</li>
        <li>Menu element #2</li>
        <li>Menu element #3</li>
      </>
    ),
  },
};

export const BottomLeftPositioned: Story = {
  args: {
    isVisible: true,
    position: "bottom-left",
    children: (
      <>
        <li>Menu element #1</li>
        <li>Menu element #2</li>
        <li>Menu element #3</li>
      </>
    ),
  },
};
