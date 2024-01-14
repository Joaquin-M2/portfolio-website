import { render, screen } from "@testing-library/react";
import Form from "./Form";
import userEvent from "@testing-library/user-event";

const backendResponse = { message: "Backend message", status: 200 };
const sendFormFunction = jest.fn((e) => e.preventDefault());
const clearFormFunction = jest.fn();

describe("<Form /> component", () => {
  it("can be rendered", () => {
    render(
      <Form id="1" onSubmit={(e) => e.preventDefault()}>
        <input />
      </Form>
    );

    const form = screen.getByRole("form");

    expect(form).toBeInTheDocument();
  });

  it("can be rendered with its own 'Send' and 'Clear' buttons", () => {
    render(
      <Form
        id="1"
        backendResponse={backendResponse}
        isPending={false}
        usesItsOwnButtons
        onSubmit={sendFormFunction}
      >
        <input />
      </Form>
    );

    const formButtons = screen.getAllByRole("button");

    expect(formButtons).toHaveLength(2);
  });

  it("can submit itself through its own 'Send' button", async () => {
    render(
      <Form
        id="1"
        backendResponse={backendResponse}
        isPending={false}
        usesItsOwnButtons
        onSubmit={sendFormFunction}
      >
        <input />
      </Form>
    );

    const sendFormButton = screen.getByRole("button", { name: "Send" });
    await userEvent.click(sendFormButton);

    expect(sendFormFunction).toHaveBeenCalled();
  });

  it("can reset itself through its own 'Clear' button", async () => {
    render(
      <Form
        id="1"
        backendResponse={backendResponse}
        isPending={false}
        usesItsOwnButtons
        onSubmit={sendFormFunction}
        onReset={clearFormFunction}
      >
        <input />
      </Form>
    );

    const clearFormButton = screen.getByRole("button", { name: "Clear" });
    await userEvent.click(clearFormButton);

    expect(clearFormFunction).toHaveBeenCalled();
  });

  it("can have a <fieldset>", () => {
    render(
      <Form
        id="1"
        backendResponse={backendResponse}
        isPending={false}
        usesItsOwnButtons
        onSubmit={sendFormFunction}
        onReset={clearFormFunction}
        hasFieldset
      >
        <input />
      </Form>
    );

    const fieldset = screen.getByRole("group");

    expect(fieldset).toBeInTheDocument();
  });

  it("can have a <legend>", () => {
    render(
      <Form
        id="1"
        backendResponse={backendResponse}
        isPending={false}
        usesItsOwnButtons
        onSubmit={sendFormFunction}
        onReset={clearFormFunction}
        hasFieldset
        legend="Test legend"
      >
        <input />
      </Form>
    );

    const legend = screen.getByRole("heading", { name: "Test legend" });

    expect(legend).toBeInTheDocument();
  });
});
