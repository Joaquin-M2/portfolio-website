import { render, screen, within } from "@testing-library/react";
import FiltersBar2 from "./FiltersBar2";
import userEvent from "@testing-library/user-event";

const tags = [
  { _id: "1", name: "Button #1" },
  { _id: "2", name: "Button #2" },
  { _id: "3", name: "Button #3" },
];
const selectedTags = ["Button #1", "Button #3"];
const mockFilterBySearchFunction = jest.fn();
const mockFilterByTagFunction = jest.fn();
const mockHandleRemoveFilterTagFunction = jest.fn();

describe("<FiltersBar2 /> component", () => {
  it("is shown or hidden whenever the user clicks on the 'FILTERS' button", async () => {
    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        selectedFilterTags={selectedTags}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        tags={tags}
      />
    );

    const filtersContainer = screen.getByRole("complementary");
    const showFiltersButton = within(filtersContainer).getByRole("checkbox");

    await userEvent.click(showFiltersButton);
    expect(filtersContainer).toHaveClass("showFiltersBar");
    await userEvent.click(showFiltersButton);
    expect(filtersContainer).not.toHaveClass("showFiltersBar");
  });

  it("triggers a filter function every time the user types in the search input field", async () => {
    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        selectedFilterTags={selectedTags}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        tags={tags}
      />
    );

    const userSearchText = "Test";
    const searchInput = screen.getByRole("searchbox");
    await userEvent.type(searchInput, userSearchText);

    expect(mockFilterBySearchFunction).toHaveBeenCalledTimes(
      userSearchText.length
    );
  });

  it("renders a list of filter tags", () => {
    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        selectedFilterTags={[]}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        tags={tags}
      />
    );

    const availableFilterTags = screen.getAllByRole("option");

    expect(availableFilterTags.length).toBe(tags.length);
  });

  it("renders a list of 'filter tags' with 'selected tags' being subtracted", () => {
    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        selectedFilterTags={selectedTags}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        tags={tags}
      />
    );

    const availableFilterTags = screen.getAllByRole("option");

    expect(availableFilterTags.length).toBe(tags.length - selectedTags.length);
  });

  it("triggers a filter function when the user clicks on a filter tag", async () => {
    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        selectedFilterTags={selectedTags}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        tags={tags}
      />
    );

    const availableFilterTags = screen.getAllByRole("option");
    await userEvent.click(availableFilterTags[0]);

    expect(mockFilterByTagFunction).toHaveBeenCalled();
  });

  it("triggers a filter function when the user clicks on a selected filter tag to remove it", async () => {
    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        selectedFilterTags={selectedTags}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        tags={tags}
      />
    );

    const tagsContainer = screen.getByRole("list");
    const selectedFilterTags = within(tagsContainer).getAllByRole("listitem");
    await userEvent.click(selectedFilterTags[0]);

    expect(mockHandleRemoveFilterTagFunction).toHaveBeenCalled();
  });
});
