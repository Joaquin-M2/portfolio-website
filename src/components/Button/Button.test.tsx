import { render, screen } from "@testing-library/react";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

const mockedOnClickFunction = jest.fn();
const mockedOnSubmitFunction = jest.fn((e) => e.preventDefault());

describe("<Button /> component", () => {
  it("is rendered", () => {
    render(<Button>Test</Button>);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  it("has a 'small' variant", () => {
    render(<Button small>Test</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("small");
  });

  it("can be disabled", () => {
    render(
      <Button onClick={mockedOnClickFunction} disabled>
        Test
      </Button>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("disabled");
  });

  it("can be of type 'submit'", () => {
    render(<Button type="submit">Test</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "submit");
  });

  it("can be of type 'reset'", () => {
    render(<Button type="reset">Test</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("type", "reset");
  });

  it("can be associated to a form, even if the button is outside of the form", async () => {
    render(
      <>
        <form id="form-test" onSubmit={mockedOnSubmitFunction}></form>
        <Button form="form-test" type="submit">
          Test
        </Button>
      </>
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockedOnSubmitFunction).toHaveBeenCalled();
  });

  it("can have a MouseEvent (onClick) function", async () => {
    render(<Button onClick={mockedOnClickFunction}>Test</Button>);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockedOnClickFunction).toHaveBeenCalled();
  });
});
