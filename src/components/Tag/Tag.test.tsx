import { render, screen } from "@testing-library/react";
import Tag from "./Tag";
import { userEvent } from "@testing-library/user-event";

const handleRemoveFilterTagFunction = jest.fn();

describe("<Tag /> component", () => {
  it("can be a <button>", () => {
    render(<Tag isFilterButton>Content</Tag>);

    const tag = screen.getByRole("listitem");

    expect(tag).toHaveClass("tagButton");
  });

  it("can be a <span>", () => {
    render(<Tag>Content</Tag>);

    const tag = screen.getByRole("listitem");

    expect(tag).toHaveClass("tag");
  });

  it("calls 'handleRemoveFilterTagFunction' when it is a button and it is clicked", async () => {
    render(
      <Tag isFilterButton handleRemoveFilterTag={handleRemoveFilterTagFunction}>
        Content
      </Tag>
    );

    const tag = screen.getByRole("listitem");
    await userEvent.click(tag);

    expect(handleRemoveFilterTagFunction).toHaveBeenCalled();
  });
});
