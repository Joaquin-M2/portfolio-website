import { render, screen } from "@testing-library/react";
import SkillsBackend from "../skills/backend/page";
import { mockAnimationsApi } from "jsdom-testing-mocks";

mockAnimationsApi();

describe("<SkillsBackend /> page", () => {
  it("can be rendered", () => {
    render(<SkillsBackend />);

    const skillBlocks = screen.getAllByRole("tree");

    expect(skillBlocks.length).toBe(2); // Node and Python blocks.
  });
});
