import { render, screen } from "@testing-library/react";
import Backdrop from "./Backdrop";
import userEvent from "@testing-library/user-event";

const mockedHideBackdropFunction = jest.fn();

describe("<Backdrop /> component", () => {
  it("is rendered", () => {
    render(
      <Backdrop isShown={true} hideBackdrop={mockedHideBackdropFunction} />
    );

    const backdrop = screen.getByRole("presentation");

    expect(backdrop).toBeInTheDocument();
  });

  it("calls the 'hideBackdrop' function when it is clicked", async () => {
    render(
      <Backdrop isShown={true} hideBackdrop={mockedHideBackdropFunction} />
    );

    const backdrop = screen.getByRole("presentation");
    await userEvent.click(backdrop);

    expect(mockedHideBackdropFunction).toHaveBeenCalled();
  });
});
