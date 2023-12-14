import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import projects from "@/data/labs";

import Slider from "./Slider";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Core/Slider",
  component: Slider,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    activeThumbnail: {
      description: "Check what thumbnail is the active one.",
      type: "string",
    },
    additionalStyles: {
      description:
        "Optional class name(s) that we may want to add to 'Slider' wherever it is imported.",
      type: "string",
    },
    children: {
      description:
        "Project details. They are string(s) that are automatically transformed into 'li' elements.",
    },
    imageSrc: {
      description: "Link to the image. It can be an external or internal file.",
      type: "string",
    },
    liveProjectLink: {
      description: "Link to the project so the user can interact with it.",
      type: "string",
    },
    nextProject: {
      description: "Moves the user to the next project.",
      type: "function",
    },
    prevProject: {
      description: "Moves the user to the previous project.",
      type: "function",
    },
    projectDescription: {
      description: "Description of the project.",
      type: "string",
    },
    projectTitle: {
      description: "Title of the project.",
      type: "string",
    },
    repositoryLink: {
      description:
        "Link to the project repository, so the user can check the code.",
      type: "string",
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    activeThumbnail: 1,
    //additionalStyles: "",
    children: projects[1].details,
    imageSrc: faker.image.urlLoremFlickr({ width: 500, height: 500 }),
    liveProjectLink: faker.internet.url(),
    nextProject: () => {},
    prevProject: () => {},
    projectDescription: projects[2].description,
    projectTitle: faker.lorem.words(3),
    repositoryLink: faker.internet.url(),
  },
};
