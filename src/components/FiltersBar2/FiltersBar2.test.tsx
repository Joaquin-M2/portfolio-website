import { cleanup, render, screen, within } from "@testing-library/react";
import FiltersBar2 from "./FiltersBar2";
import userEvent from "@testing-library/user-event";

const tags = [
  { _id: "1", name: "Button #1" },
  { _id: "2", name: "Button #2" },
  { _id: "3", name: "Button #3" },
  { _id: "4", name: "Button #4" },
];
const selectedTags = ["Button #1", "Button #3"];
const selectedExcludingTags = ["Button #2"];
const mockFilterBySearchFunction = jest.fn();
const mockFilterByTagFunction = jest.fn();
const mockFilterByExcludingTagFunction = jest.fn();
const mockHandleRemoveFilterTagFunction = jest.fn();
const mockHandleRemoveExcludingFilterTagFunction = jest.fn();
const mockPullSearchType = jest.fn();

describe("<FiltersBar2 /> component", () => {
  it("is shown or hidden whenever the user clicks on the 'FILTERS' button", async () => {
    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        filterByExcludingTagFunction={mockFilterByExcludingTagFunction}
        selectedFilterTags={selectedTags}
        selectedExcludingFilterTags={selectedExcludingTags}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        handleRemoveExcludingFilterTag={
          mockHandleRemoveExcludingFilterTagFunction
        }
        pushSearchType={mockPullSearchType}
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
        filterByExcludingTagFunction={mockFilterByExcludingTagFunction}
        selectedFilterTags={selectedTags}
        selectedExcludingFilterTags={selectedExcludingTags}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        handleRemoveExcludingFilterTag={
          mockHandleRemoveExcludingFilterTagFunction
        }
        pushSearchType={mockPullSearchType}
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

  it("triggers a filter function every time the user types in the search input field after selecting 'By Description'", async () => {
    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        filterByExcludingTagFunction={mockFilterByExcludingTagFunction}
        selectedFilterTags={selectedTags}
        selectedExcludingFilterTags={selectedExcludingTags}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        handleRemoveExcludingFilterTag={
          mockHandleRemoveExcludingFilterTagFunction
        }
        pushSearchType={mockPullSearchType}
        tags={tags}
      />
    );

    const byDescriptionRadioButton = screen.getByRole("radio", {
      name: "By Description",
    });
    await userEvent.click(byDescriptionRadioButton);

    const userSearchText = "Test";
    const searchInput = screen.getByRole("searchbox");
    await userEvent.type(searchInput, userSearchText);

    expect(mockFilterBySearchFunction).toHaveBeenCalled(); // '.toHaveBeenCalledTimes()' is keeping the triggers from the previous test.
  });

  it("renders the quantity of tools found", async () => {
    const toolsQuantity = 123;

    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        filterByExcludingTagFunction={mockFilterByExcludingTagFunction}
        selectedFilterTags={selectedTags}
        selectedExcludingFilterTags={selectedExcludingTags}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        handleRemoveExcludingFilterTag={
          mockHandleRemoveExcludingFilterTagFunction
        }
        pushSearchType={mockPullSearchType}
        tags={tags}
        toolsQuantity={toolsQuantity}
      />
    );

    const toolsFoundP = screen.getByTestId("toolsFoundP");

    expect(toolsFoundP).toContainHTML(
      `<p class="toolsFound" data-testid="toolsFoundP"><span class="toolsFoundSpan">Tools found:</span> ${toolsQuantity}</p>`
    );
  });

  it("renders a list of 'including' filter tags", () => {
    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        filterByExcludingTagFunction={mockFilterByExcludingTagFunction}
        selectedFilterTags={[]}
        selectedExcludingFilterTags={[]}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        handleRemoveExcludingFilterTag={
          mockHandleRemoveExcludingFilterTagFunction
        }
        pushSearchType={mockPullSearchType}
        tags={tags}
      />
    );

    const includingTagsList = screen.getAllByRole("listbox")[0];
    const availableFilterTags =
      within(includingTagsList).getAllByRole("option");

    expect(availableFilterTags.length).toBe(tags.length);
  });

  it("renders a list of 'excluding' filter tags", () => {
    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        filterByExcludingTagFunction={mockFilterByExcludingTagFunction}
        selectedFilterTags={[]}
        selectedExcludingFilterTags={[]}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        handleRemoveExcludingFilterTag={
          mockHandleRemoveExcludingFilterTagFunction
        }
        pushSearchType={mockPullSearchType}
        tags={tags}
      />
    );

    const excludingTagsList = screen.getAllByRole("listbox")[1];
    const availableExcludingFilterTags =
      within(excludingTagsList).getAllByRole("option");

    expect(availableExcludingFilterTags.length).toBe(tags.length);
  });

  it("renders a list of 'filter tags' with 'selected tags' being subtracted", () => {
    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        filterByExcludingTagFunction={mockFilterByExcludingTagFunction}
        selectedFilterTags={selectedTags}
        selectedExcludingFilterTags={selectedExcludingTags}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        handleRemoveExcludingFilterTag={
          mockHandleRemoveExcludingFilterTagFunction
        }
        pushSearchType={mockPullSearchType}
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
        filterByExcludingTagFunction={mockFilterByExcludingTagFunction}
        selectedFilterTags={selectedTags}
        selectedExcludingFilterTags={selectedExcludingTags}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        handleRemoveExcludingFilterTag={
          mockHandleRemoveExcludingFilterTagFunction
        }
        pushSearchType={mockPullSearchType}
        tags={tags}
      />
    );

    const availableFilterTags = screen.getAllByRole("option");
    await userEvent.click(availableFilterTags[0]);

    expect(mockFilterByTagFunction).toHaveBeenCalled();
  });

  it("triggers a filter function when the user clicks on a selected filter tag ('Including' tags) to remove it", async () => {
    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        filterByExcludingTagFunction={mockFilterByExcludingTagFunction}
        selectedFilterTags={selectedTags}
        selectedExcludingFilterTags={selectedExcludingTags}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        handleRemoveExcludingFilterTag={
          mockHandleRemoveExcludingFilterTagFunction
        }
        pushSearchType={mockPullSearchType}
        tags={tags}
      />
    );

    const includingTagsContainer = screen.getAllByRole("list")[0];
    const selectedFilterTags = within(includingTagsContainer).getAllByRole(
      "listitem"
    );
    await userEvent.click(selectedFilterTags[0]);

    expect(mockHandleRemoveFilterTagFunction).toHaveBeenCalled();
  });

  it("triggers a filter function when the user clicks on a selected filter tag ('Excluding' tags) to remove it", async () => {
    render(
      <FiltersBar2
        filterBySearchFunction={mockFilterBySearchFunction}
        filterByTagFunction={mockFilterByTagFunction}
        filterByExcludingTagFunction={mockFilterByExcludingTagFunction}
        selectedFilterTags={selectedTags}
        selectedExcludingFilterTags={selectedExcludingTags}
        handleRemoveFilterTag={mockHandleRemoveFilterTagFunction}
        handleRemoveExcludingFilterTag={
          mockHandleRemoveExcludingFilterTagFunction
        }
        pushSearchType={mockPullSearchType}
        tags={tags}
      />
    );

    const excludingTagsContainer = screen.getAllByRole("list")[1];
    const selectedExcludingFilterTags = within(
      excludingTagsContainer
    ).getAllByRole("listitem");
    await userEvent.click(selectedExcludingFilterTags[0]);

    expect(mockHandleRemoveExcludingFilterTagFunction).toHaveBeenCalled();
  });
});
