import { render, screen } from "@testing-library/react";
import DeleteToolForm from "./DeleteToolForm";

const hideModalFunction = jest.fn();

describe("<DeleteToolForm /> component", () => {
  it("can be rendered", () => {
    render(
      <DeleteToolForm
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
