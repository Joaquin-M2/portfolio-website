import type { Preview } from "@storybook/react";

import "@/sass/main.scss";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Core", "Pages", "*"],
      },
    },
  },
};

export default preview;
