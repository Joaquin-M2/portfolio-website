import type { Meta, StoryObj } from "@storybook/react";

import NavBarButton from "./NavBarButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Navigation Bar Button",
  component: NavBarButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    href: {
      description: "Path where the button should take the user to.",
      type: "string",
    },
    pathnameStartsWith: {
      description:
        "Beginning of the path where the button takes the user to. IF the user is on that path, the button styling changes to 'Active button'.",
      type: "string",
    },
    increasedBorderRadiusPosition: {
      description:
        "Set if the button should have some border radius, and in which corner.",
      type: "string",
    },
    children: {
      description: "Title of the button.",
      type: "string",
    },
  },
} satisfies Meta<typeof NavBarButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    href: "/",
    pathnameStartsWith: "/123",
    //increasedBorderRadiusPosition: "",
    children: "NavBar Button",
  },
};

export const Active: Story = {
  args: {
    href: "/",
    pathnameStartsWith: "/",
    //increasedBorderRadiusPosition: "",
    children: "NavBar Button",
  },
};

export const BorderRadiusTL: Story = {
  args: {
    href: "/",
    pathnameStartsWith: "/123",
    increasedBorderRadiusPosition: "top-left",
    children: "NavBar Button",
  },
};

export const BorderRadiusTR: Story = {
  args: {
    href: "/",
    pathnameStartsWith: "/123",
    increasedBorderRadiusPosition: "top-right",
    children: "NavBar Button",
  },
};

export const BorderRadiusBL: Story = {
  args: {
    href: "/",
    pathnameStartsWith: "/123",
    increasedBorderRadiusPosition: "bottom-left",
    children: "NavBar Button",
  },
};

export const BorderRadiusBR: Story = {
  args: {
    href: "/",
    pathnameStartsWith: "/123",
    increasedBorderRadiusPosition: "bottom-right",
    children: "NavBar Button",
  },
};
