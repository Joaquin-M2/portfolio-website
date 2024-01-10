import { render, screen } from "@testing-library/react";
import FilterButton from "./FilterButton";
import userEvent from "@testing-library/user-event";

const mockAddAndRemoveFilterFunction = jest.fn();

describe("<FilterButton /> component", () => {
  it("triggers a filtering function when it is clicked", async () => {
    render(
      <FilterButton addAndRemoveFilter={mockAddAndRemoveFilterFunction}>
        Test
      </FilterButton>
    );

    const filterButton = screen.getByRole("checkbox");
    await userEvent.click(filterButton);

    expect(mockAddAndRemoveFilterFunction).toHaveBeenCalled();
  });
});
