import { render, screen, within } from "@testing-library/react";
import ListContainer from "./ListContainer";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

const itemsSet = new Set(
  Array(20)
    .fill(null)
    .map(() => faker.person.fullName())
);

const items = [...itemsSet]
  .sort((a, b) => a.localeCompare(b))
  .map((tagName) => ({
    _id: faker.string.uuid(),
    name: tagName,
    url: faker.image.avatarGitHub(),
  }));

describe("<ListContainer /> component", () => {
  it("can be rendered", () => {
    render(<ListContainer title="Test title" items={items} />);

    const ulList = screen.getByRole("list");
    const listElements = within(ulList).getAllByRole("listitem");

    expect(listElements).toHaveLength(items.length);
  });

  it("can show or hide the list element image when the element is clicked on", async () => {
    render(<ListContainer title="Test title" items={items} usesIconPreview />);

    const ulList = screen.getByRole("list");
    const listElements = within(ulList).getAllByRole("listitem");
    await userEvent.click(listElements[0]);
    const firstListElementImage = screen.getByRole("img");

    expect(firstListElementImage).toBeInTheDocument();
    await userEvent.click(listElements[0]);
    expect(firstListElementImage).not.toBeInTheDocument();
  });
});
