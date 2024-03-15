import { render, screen, within } from "@testing-library/react";
import PortfolioLabs from "../portfolio/labs/page";
import userEvent from "@testing-library/user-event";

describe("<PortfolioLabs /> page", () => {
  it("can be rendered", () => {
    render(<PortfolioLabs />);

    const filtersAside = screen.getByText("Filter per Technology");
    const thumbnails = screen.getAllByTestId("sliderThumbnail");
    const moveSlideButtons = screen.getAllByTestId("moveSlideButtonDiv");
    const slider = screen.getByTestId("sliderDiv");

    expect(filtersAside).toBeInTheDocument();
    expect(thumbnails.length).toBeGreaterThanOrEqual(1);
    expect(moveSlideButtons.length).toBe(2);
    expect(slider).toBeInTheDocument();
  });

  it("can filter lBS", async () => {
    render(<PortfolioLabs />);

    const filterButtonsList = screen.getAllByRole("list")[0];
    const filterButton = within(filterButtonsList).getAllByRole("button", {
      name: "On",
    })[4];
    const unfilteredThumbnails = screen.getAllByTestId("sliderThumbnail");
    await userEvent.click(filterButton);
    const filteredThumbnails = screen.getAllByTestId("sliderThumbnail");

    expect(filteredThumbnails.length).toBeLessThanOrEqual(
      unfilteredThumbnails.length
    );
  });

  it("changes slider content when selecting a different thumbnail", async () => {
    render(<PortfolioLabs />);

    const slider = screen.getByTestId("sliderDiv");
    const sliderTitle = within(slider).getByRole("heading").textContent;
    const thumbnails = screen.getAllByTestId("sliderThumbnail");
    await userEvent.click(thumbnails[1]);
    const sliderNextToolTitle = within(slider).getByRole("heading").textContent;

    expect(sliderTitle).not.toBe(sliderNextToolTitle);
  });

  it("changes slider content when clicking a 'moveSlideButton' button", async () => {
    render(<PortfolioLabs />);

    const slider = screen.getByTestId("sliderDiv");
    const sliderTitle = within(slider).getByRole("heading").textContent;
    const moveSlideButtons = screen.getAllByTestId("moveSlideButtonDiv");
    await userEvent.click(moveSlideButtons[1]);
    const sliderNextToolTitle = within(slider).getByRole("heading").textContent;

    expect(sliderTitle).not.toBe(sliderNextToolTitle);
  });

  it("changes thumbnail to the last one when the first one is selected and the 'MoveSlideButton (left)' is clicked", async () => {
    render(<PortfolioLabs />);

    const thumbnails = screen.getAllByTestId("sliderThumbnail");
    const lastThumbnail =
      screen.getAllByTestId("sliderThumbnail")[thumbnails.length - 1];
    const moveSlideButtonLeft = screen.getAllByTestId("moveSlideButtonDiv")[0];
    await userEvent.click(moveSlideButtonLeft);

    expect(lastThumbnail).toHaveClass("activeThumbnail");
  });

  it("changes thumbnail to the first one when the last one is selected and the 'MoveSlideButton (right)' is clicked", async () => {
    render(<PortfolioLabs />);

    const firstThumbnail = screen.getAllByTestId("sliderThumbnail")[0];
    const moveSlideButtonLeft = screen.getAllByTestId("moveSlideButtonDiv")[0];
    const moveSlideButtonRight = screen.getAllByTestId("moveSlideButtonDiv")[1];
    await userEvent.click(moveSlideButtonLeft);
    await userEvent.click(moveSlideButtonRight);

    expect(firstThumbnail).toHaveClass("activeThumbnail");
  });
});
