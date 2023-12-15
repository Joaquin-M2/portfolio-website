import type { Meta, StoryObj } from "@storybook/react";

import Tongue from "./Tongue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Tongues Container/Tongue",
  component: Tongue,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    isGithubLink: {
      description: "Set if it is a Github link or a Return link.",
      type: "boolean",
    },
    githubPath: {
      description: "Link to the relevant GitHub repository.",
      type: "string",
    },
  },
} satisfies Meta<typeof Tongue>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const GithubLink: Story = {
  args: {
    isGithubLink: true,
    githubPath: "https://github.com/Joaquin-M2/portfolio-website",
  },
};

export const ReturnLink: Story = {
  args: {
    isGithubLink: false,
  },
};
