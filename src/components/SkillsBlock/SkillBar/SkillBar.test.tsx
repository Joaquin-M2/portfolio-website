import { render, screen, within } from "@testing-library/react";
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

  it("can be of blue color (red is default)", () => {
    const progressBarTitle = "Aria roles";
    render(
      <SkillBar
        color="blue"
        href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles"
        progressPercentage={75}
        title={progressBarTitle}
      />
    );

    const progressBarTitleElement = screen.getByText(progressBarTitle);
    const progressBarElement = screen.getByRole("progressbar");

    expect(progressBarTitleElement).toHaveClass("TechTagBlue");
    expect(progressBarElement).toHaveClass("ProgressBarContainerBlue");
  });

  it("can be of orange color (red is default)", () => {
    const progressBarTitle = "Aria roles";
    render(
      <SkillBar
        color="orange"
        href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles"
        progressPercentage={75}
        title={progressBarTitle}
      />
    );

    const progressBarTitleElement = screen.getByText(progressBarTitle);
    const progressBarElement = screen.getByRole("progressbar");

    expect(progressBarTitleElement).toHaveClass("TechTagOrange");
    expect(progressBarElement).toHaveClass("ProgressBarContainerOrange");
  });

  it("can be parent of other(s) <SkillBar>", () => {
    const progressBarTitle = "Aria roles";
    render(
      <SkillBar
        color="orange"
        href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles"
        progressPercentage={75}
        title={progressBarTitle}
      >
        <SkillBar
          isSubLevel
          href="#"
          progressPercentage={60}
          title="Dummy title #1"
        />
        <SkillBar
          isSubLevel
          href="#"
          progressPercentage={70}
          title="Dummy title #2"
        />
      </SkillBar>
    );

    const parentSkillBar = screen.getAllByRole("treeitem")[0];
    const childrenSkillBars = within(parentSkillBar).getAllByRole("treeitem");
    const firstChildSkillBarAnchorTag = within(childrenSkillBars[0]).getByRole(
      "link"
    );

    expect(childrenSkillBars).toHaveLength(2);
    expect(firstChildSkillBarAnchorTag).toHaveClass("isSubLevel");
  });

  it("can be parent of other(s) <SkillBar> and be sibling of another subLevel <SkillBar>", () => {
    const progressBarTitle = "Aria roles";
    render(
      <SkillBar
        color="orange"
        href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles"
        progressPercentage={75}
        title={progressBarTitle}
      >
        <SkillBar
          isSubLevel
          isSubLevelWithChild
          href="#"
          progressPercentage={60}
          title="Dummy title #1"
        >
          <SkillBar
            isSubLevel
            href="#"
            progressPercentage={80}
            title="Dummy title #1.1"
          />
        </SkillBar>
        <SkillBar
          isSubLevel
          href="#"
          progressPercentage={70}
          title="Dummy title #2"
        />
      </SkillBar>
    );

    const firstLevelSkillBar = screen.getAllByRole("treeitem")[0];
    const secondLevelSkillBar =
      within(firstLevelSkillBar).getAllByRole("treeitem")[0];
    const thirdLevelSkillBar =
      within(secondLevelSkillBar).getByRole("treeitem");
    const secondLevelSkillBarAnchorTag =
      within(secondLevelSkillBar).getAllByRole("link")[0];
    const thirdLevelSkillBarAnchorTag =
      within(thirdLevelSkillBar).getByRole("link");

    expect(thirdLevelSkillBar).toBeInTheDocument();
    expect(secondLevelSkillBarAnchorTag).toHaveClass("isSubLevelWithChild");
    expect(thirdLevelSkillBarAnchorTag).toHaveClass("isSubLevel");
  });
});
