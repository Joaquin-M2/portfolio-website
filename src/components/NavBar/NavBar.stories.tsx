import type { Meta, StoryObj } from "@storybook/react";

import NavBar from "./NavBar";
import {
  Base as Basic,
  BorderRadiusTL,
  BorderRadiusTR,
  BorderRadiusBL,
  BorderRadiusBR,
} from "./NavBarButton/NavBarButton.stories";
import NavBarButton from "./NavBarButton/NavBarButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Navigation Bar",
  component: NavBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    additionalStyles: {
      description: "Any additional CSS class name we may want to add.",
      type: "string",
    },
    top: {
      description:
        "Set the navigation bar at the top of the screen. Default is bottom",
      type: "string",
    },
    narrow: {
      description:
        "Set if the width of the navigation bar should be narrow instead of taking the full screen width.",
      type: "string",
    },
    children: {
      description:
        "Content of the navigation bar. Usually they consist of 'NavBarButton' components.",
    },
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    //additionalStyles: "",
    //top: "",
    //narrow: "",
    children: (
      <>
        <NavBarButton {...BorderRadiusTL.args} />
        <NavBarButton {...Basic.args} />
        <NavBarButton {...BorderRadiusTR.args} />
      </>
    ),
  },
};

export const Narrow: Story = {
  args: {
    //additionalStyles: "",
    //top: "",
    narrow: true,
    children: (
      <>
        <NavBarButton {...BorderRadiusTL.args} />
        <NavBarButton {...Basic.args} />
        <NavBarButton {...BorderRadiusTR.args} />
      </>
    ),
  },
};

export const Top: Story = {
  args: {
    //additionalStyles: "",
    top: true,
    //narrow: true,
    children: (
      <>
        <NavBarButton {...BorderRadiusBL.args} />
        <NavBarButton {...Basic.args} />
        <NavBarButton {...BorderRadiusBR.args} />
      </>
    ),
  },
};
