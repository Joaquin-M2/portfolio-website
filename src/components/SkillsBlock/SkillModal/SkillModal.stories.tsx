import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import SkillModal from "./SkillModal";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Skills Block/Skill Bar/Skill Modal",
  component: SkillModal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    closeFromBackdrop: {
      description: "Function to close the modal clicking on the backdrop.",
      type: "function",
    },
    closeFromButton: {
      description: "Function to close the modal clicking on the 'X' button.",
      type: "function",
    },
    modalIsShown: {
      description: "Sets if the modal is shown or hidden.",
      type: "boolean",
    },
    title: {
      description: "Title of the modal.",
      type: "string",
    },
    children: {
      description:
        "Content of the modal. Usually it is a group of 'p' elements.",
    },
  },
} satisfies Meta<typeof SkillModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const modalContent = (
  <>
    <p>{faker.lorem.paragraph(5)}</p>
    <p>{faker.lorem.paragraph(10)}</p>
  </>
);

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    closeFromBackdrop: () => {},
    closeFromButton: () => {},
    modalIsShown: true,
    title: "Skill name",
    children: modalContent,
  },
};
