import { render, screen, within } from "@testing-library/react";
import NavBar from "./NavBar";

describe("<NavBar /> component", () => {
  it("can be rendered", () => {
    render(
      <NavBar>
        <button>Button #1</button>
        <button>Button #2</button>
      </NavBar>
    );

    const navElement = screen.getByRole("navigation");
    const buttons = within(navElement).getAllByRole("button");

    expect(buttons).toHaveLength(2);
  });

  it("can be rendered at the top of the screen instead of bottom (default behavior)", () => {
    render(
      <NavBar top>
        <button>Button #1</button>
        <button>Button #2</button>
      </NavBar>
    );

    const wrapperDiv = screen.getByTestId("navBarWrapperDiv");

    expect(wrapperDiv).toHaveClass("containerTop");
  });

  it("can be narrow instead of occupying the full width of the container", () => {
    render(
      <NavBar narrow>
        <button>Button #1</button>
        <button>Button #2</button>
      </NavBar>
    );

    const wrapperDiv = screen.getByTestId("navBarWrapperDiv");

    expect(wrapperDiv).toHaveClass("containerNarrow");
  });
});
