import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import ListContainer from "./ListContainer";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/List Container",
  component: ListContainer,
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
    items: {
      control: "object",
      description: "Elements listed in the component.",
    },
    title: {
      description: "Title of the list.",
      type: "string",
    },
    usesIconPreview: {
      description: "Show an icon related to the element when it is clicked.",
      type: "boolean",
    },
  },
} satisfies Meta<typeof ListContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const randomUsersSet = new Set(
  Array(20)
    .fill(null)
    .map(() => faker.person.fullName())
);

const randomUsers = [...randomUsersSet]
  .sort((a, b) => a.localeCompare(b))
  .map((tagName) => ({
    _id: faker.string.uuid(),
    name: tagName,
    url: faker.image.avatarGitHub(),
  }));

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    title: "List title",
    items: randomUsers,
  },
};

export const WithIconsOnClick: Story = {
  args: {
    title: "List title",
    items: randomUsers,
    usesIconPreview: true,
  },
};
