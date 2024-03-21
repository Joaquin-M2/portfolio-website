import { render, screen } from "@testing-library/react";
import DeleteResourceForm from "./DeleteResourceForm";

const hideModalFunction = jest.fn();

describe("<DeleteResourceForm /> component", () => {
  it("can be rendered", () => {
    render(
      <DeleteResourceForm
        description="Text for description"
        formIsOpen={true}
        hideModal={hideModalFunction}
        id="1"
        setToolsFrontend={() => {}}
        title="Text for title"
      />
    );

    const form = screen.getByRole("form");

    expect(form).toBeInTheDocument();
  });
});
