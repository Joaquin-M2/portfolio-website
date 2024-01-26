import { render, screen } from "@testing-library/react";
import UpdateToolForm from "./UpdateToolForm";

const hideModalFunction = jest.fn();
const allOptions = [
  {
    _id: "1",
    name: "Option #1",
  },
  {
    _id: "2",
    name: "Option #2",
  },
  {
    _id: "3",
    name: "Option #3",
  },
];

const selectedOptions = [
  {
    _id: "2",
    name: "Option #2",
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as jest.Mock;

global.Request = jest.fn();

describe("<UpdateToolForm /> component", () => {
  it("can be rendered", () => {
    render(
      <UpdateToolForm
        allOptions={allOptions}
        handleAddTag={() => {}}
        handleRemoveTag={() => {}}
        selectedTagsAddToolForm={selectedOptions}
        requestMethod="GET"
        requestUrlPath="#"
        formIsOpen={true}
        hideModal={hideModalFunction}
        id="1"
        setToolsFrontend={() => {}}
      />
    );

    const form = screen.getByRole("form");

    expect(form).toBeInTheDocument();
  });
});
