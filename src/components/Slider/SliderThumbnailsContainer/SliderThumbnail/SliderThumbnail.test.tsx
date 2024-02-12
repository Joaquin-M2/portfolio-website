import { render, screen } from "@testing-library/react";
import SliderThumbnail from "./SliderThumbnail";
import { userEvent } from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

const updateStateForActiveThumbnailFunction = jest.fn();

describe("<SliderThumbnail /> component", () => {
  it("shows a specific style when selected", () => {
    render(
      <SliderThumbnail
        image={faker.image.urlLoremFlickr()}
        updateStateForActiveThumbnail={updateStateForActiveThumbnailFunction}
        setButtonIsChecked={true}
      />
    );

    const wrappingDiv = screen.getByTestId("sliderThumbnail");
    const image = screen.getByRole("img");

    expect(wrappingDiv).toHaveClass("activeThumbnail");
    expect(image).not.toHaveClass("inactiveThumbnail");
  });

  it("shows a specific style when unselected", () => {
    render(
      <SliderThumbnail
        image={faker.image.urlLoremFlickr()}
        updateStateForActiveThumbnail={updateStateForActiveThumbnailFunction}
        setButtonIsChecked={false}
      />
    );

    const label = screen.getByTestId("sliderThumbnail");
    const image = screen.getByRole("img");

    expect(label).not.toHaveClass("activeThumbnail");
    expect(image).toHaveClass("inactiveThumbnail");
  });

  it("calls the 'updateStateForActiveThumbnailFunction' when clicked", async () => {
    render(
      <SliderThumbnail
        image={faker.image.urlLoremFlickr()}
        updateStateForActiveThumbnail={updateStateForActiveThumbnailFunction}
        setButtonIsChecked={false}
      />
    );

    const wrappingDiv = screen.getByTestId("sliderThumbnail");
    await userEvent.click(wrappingDiv);

    expect(updateStateForActiveThumbnailFunction).toHaveBeenCalled();
  });
});
