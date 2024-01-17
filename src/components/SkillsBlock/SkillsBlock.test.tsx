import { render, screen } from "@testing-library/react";
import SkillsBlock from "./SkillsBlock";

describe("<SkillsBlock /> component", () => {
  it("can be rendered with the red color as default", () => {
    render(
      <SkillsBlock>
        <p>SkillsBlock content</p>
      </SkillsBlock>
    );

    const skillsBlock = screen.getByRole("tree");

    expect(skillsBlock).toHaveClass("red");
  });

  it("can be green", () => {
    render(
      <SkillsBlock color="green">
        <p>SkillsBlock content</p>
      </SkillsBlock>
    );

    const skillsBlock = screen.getByRole("tree");

    expect(skillsBlock).toHaveClass("green");
  });

  it("can be yellow", () => {
    render(
      <SkillsBlock color="yellow">
        <p>SkillsBlock content</p>
      </SkillsBlock>
    );

    const skillsBlock = screen.getByRole("tree");

    expect(skillsBlock).toHaveClass("yellow");
  });
});
