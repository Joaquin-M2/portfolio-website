import { render, screen } from "@testing-library/react";
import MoveSlideButton from "./MoveSlideButton";
import { userEvent } from "@testing-library/user-event";

const changeSlideFunction = jest.fn();

describe("<MoveSlideButton /> component", () => {
  it("calls the 'changeSlideFunction' when clicked", async () => {
    render(<MoveSlideButton changeSlide={changeSlideFunction} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(changeSlideFunction).toHaveBeenCalled();
  });

  it("can use the 'Rightwards' arrow as its content", () => {
    render(<MoveSlideButton />);

    const div = screen.getByTestId("div");

    expect(div).toHaveClass("RightwardsArrow");
  });

  it("can use the 'Leftwards' arrow as its content", () => {
    render(<MoveSlideButton leftwardsArrow />);

    const div = screen.getByTestId("div");

    expect(div).toHaveClass("LeftwardsArrow");
  });
});
