import { render, screen, within } from "@testing-library/react";
import FiltersBar from "./FiltersBar";
import userEvent from "@testing-library/user-event";

const filterButtons = ["Button #1", "Button #2", "Button #3"];
const mockChangeFilterFunction = jest.fn();

describe("<FiltersBar /> component", () => {
  it("renders as many <FilterButton /> as given in an array in the 'filterButtons' prop", () => {
    render(
      <FiltersBar
        filterButtons={filterButtons}
        changeFilter={mockChangeFilterFunction}
      />
    );

    const asideElement = screen.getByRole("complementary");
    const renderedFilterButtons = within(asideElement).getAllByRole("checkbox");

    expect(renderedFilterButtons).toHaveLength(filterButtons.length);
  });

  it("triggers a filtering function when one of its filter buttons is clicked", async () => {
    render(
      <FiltersBar
        filterButtons={filterButtons}
        changeFilter={mockChangeFilterFunction}
      />
    );

    const asideElement = screen.getByRole("complementary");
    const firstFilterButton = within(asideElement).getAllByRole("checkbox")[0];
    await userEvent.click(firstFilterButton);

    expect(mockChangeFilterFunction).toHaveBeenCalled();
  });
});
