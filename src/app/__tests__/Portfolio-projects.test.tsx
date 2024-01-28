import { render, screen, within } from "@testing-library/react";
import PortfolioProjects from "../portfolio/projects/page";
import userEvent from "@testing-library/user-event";

describe("<PortfolioProjects /> page", () => {
  it("can be rendered", () => {
    render(<PortfolioProjects />);

    const filtersAside = screen.getByText("Filter per Technology");
    const thumbnails = screen.getAllByTestId("sliderThumbnailLabel");
    const moveSlideButtons = screen.getAllByTestId("moveSlideButtonDiv");
    const slider = screen.getByTestId("sliderDiv");

    expect(filtersAside).toBeInTheDocument();
    expect(thumbnails.length).toBeGreaterThanOrEqual(1);
    expect(moveSlideButtons.length).toBe(2);
    expect(slider).toBeInTheDocument();
  });

  it("can filter projects", async () => {
    render(<PortfolioProjects />);

    const filterButtonsList = screen.getAllByRole("list")[0];
    const filterButton = within(filterButtonsList).getAllByRole("button", {
      name: "On",
    })[4];
    const unfilteredThumbnails = screen.getAllByTestId("sliderThumbnailLabel");
    await userEvent.click(filterButton);
    const filteredThumbnails = screen.getAllByTestId("sliderThumbnailLabel");

    expect(filteredThumbnails.length).toBeLessThan(unfilteredThumbnails.length);
  });

  it("changes slider content when selecting a different thumbnail", async () => {
    render(<PortfolioProjects />);

    const slider = screen.getByTestId("sliderDiv");
    const sliderTitle = within(slider).getByRole("heading").textContent;
    const thumbnails = screen.getAllByTestId("sliderThumbnailLabel");
    await userEvent.click(thumbnails[1]);
    const sliderNextToolTitle = within(slider).getByRole("heading").textContent;

    expect(sliderTitle).not.toBe(sliderNextToolTitle);
  });

  it("changes slider content when clicking a 'moveSlideButton' button", async () => {
    render(<PortfolioProjects />);

    const slider = screen.getByTestId("sliderDiv");
    const sliderTitle = within(slider).getByRole("heading").textContent;
    const moveSlideButtons = screen.getAllByTestId("moveSlideButtonDiv");
    await userEvent.click(moveSlideButtons[1]);
    const sliderNextToolTitle = within(slider).getByRole("heading").textContent;

    expect(sliderTitle).not.toBe(sliderNextToolTitle);
  });
});
