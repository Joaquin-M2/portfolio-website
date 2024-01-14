import { render, screen, within } from "@testing-library/react";
import MenuCard from "./MenuCard";

describe("<ListContainer /> component", () => {
  it("can be rendered", () => {
    render(
      <MenuCard isVisible>
        <li>Menu item #1</li>
        <li>Menu item #2</li>
        <li>Menu item #3</li>
      </MenuCard>
    );

    const ulList = screen.getByRole("list");
    const listElements = within(ulList).getAllByRole("listitem");

    expect(listElements).toHaveLength(3);
  });

  it("can be positioned at the bottom-left of the element it is attached to", () => {
    render(
      <MenuCard isVisible position="bottom-left">
        <li>Menu item #1</li>
        <li>Menu item #2</li>
        <li>Menu item #3</li>
      </MenuCard>
    );

    const wrapperDiv = screen.getByTestId("menuCardWrapperDiv");

    expect(wrapperDiv).toHaveClass("menuCardBottomLeft");
  });
});
