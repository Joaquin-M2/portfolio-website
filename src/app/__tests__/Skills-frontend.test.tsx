import { render, screen } from "@testing-library/react";
import SkillsFrontend from "../skills/frontend/page";
import { mockAnimationsApi } from "jsdom-testing-mocks";

mockAnimationsApi();

describe("<SkillsFrontend /> page", () => {
  it("can be rendered", () => {
    render(<SkillsFrontend />);

    const skillBlocks = screen.getAllByRole("tree");

    expect(skillBlocks.length).toBe(3); // HTML, CSS and JavaScript blocks.
  });
});
