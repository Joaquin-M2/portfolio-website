import { render, screen } from "@testing-library/react";
import { mockAnimationsApi } from "jsdom-testing-mocks";
import SkillBar from "./SkillBar";

mockAnimationsApi();

describe("<SkillBar /> component", () => {
  it("can be rendered", () => {
    render(
      <SkillBar
        href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles"
        progressPercentage={75}
        title="Aria roles"
      />
    );

    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
  });
});
