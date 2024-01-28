import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("<Home /> page", () => {
  it("can be rendered", () => {
    render(<Home />);

    const buttons = screen.getAllByRole("button");

    expect(buttons.length).toBe(2); // "my portfolio" + "drop me a line" buttons.
  });
});
