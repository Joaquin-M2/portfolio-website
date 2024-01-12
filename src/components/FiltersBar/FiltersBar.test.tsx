import { render, screen, within } from "@testing-library/react";
import FiltersBar from "./FiltersBar";
import userEvent from "@testing-library/user-event";

const filterButtons = ["Button #1", "Button #2", "Button #3"];
const mockChangeFilterFunction = jest.fn();

describe("<FiltersBar /> component", () => {
  it("is shown or hidden whenever the user clicks on the 'FILTERS' button", async () => {
    render(
      <FiltersBar
        filterButtons={filterButtons}
        changeFilter={mockChangeFilterFunction}
      />
    );

    const filtersContainer = screen.getByRole("complementary");
    const showFiltersButton =
      within(filtersContainer).getAllByRole("checkbox")[0];

    await userEvent.click(showFiltersButton);
    expect(filtersContainer).toHaveClass("showFiltersBar");
    await userEvent.click(showFiltersButton);
    expect(filtersContainer).not.toHaveClass("showFiltersBar");
  });

  it("renders as many <FilterButton /> as given in an array in the 'filterButtons' prop", async () => {
    render(
      <FiltersBar
        filterButtons={filterButtons}
        changeFilter={mockChangeFilterFunction}
      />
    );

    const ulElement = screen.getByRole("list");
    const renderedFilterButtons = within(ulElement).getAllByRole("checkbox");

    expect(renderedFilterButtons).toHaveLength(filterButtons.length);
  });

  it("triggers a filtering function when one of its filter buttons is clicked", async () => {
    render(
      <FiltersBar
        filterButtons={filterButtons}
        changeFilter={mockChangeFilterFunction}
      />
    );

    const ulElement = screen.getByRole("list");
    const firstFilterButton = within(ulElement).getAllByRole("checkbox")[0];
    await userEvent.click(firstFilterButton);

    expect(mockChangeFilterFunction).toHaveBeenCalled();
  });
});
