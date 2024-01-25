import { render, screen } from "@testing-library/react";
import SliderThumbnail from "./SliderThumbnail";
import { userEvent } from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

const updateStateForActiveThumbnailFunction = jest.fn();

describe("<SliderThumbnail /> component", () => {
  it("shows a specific style when selected", () => {
    render(
      <SliderThumbnail
        forAttribute="1"
        id="2"
        image={faker.image.urlLoremFlickr()}
        updateStateForActiveThumbnail={updateStateForActiveThumbnailFunction}
        setButtonIsChecked={true}
      />
    );

    const label = screen.getByTestId("label");
    const image = screen.getByRole("img");

    expect(label).toHaveClass("activeThumbnail");
    expect(image).not.toHaveClass("inactiveThumbnail");
  });

  it("shows a specific style when unselected", () => {
    render(
      <SliderThumbnail
        forAttribute="1"
        id="2"
        image={faker.image.urlLoremFlickr()}
        updateStateForActiveThumbnail={updateStateForActiveThumbnailFunction}
        setButtonIsChecked={false}
      />
    );

    const label = screen.getByTestId("label");
    const image = screen.getByRole("img");

    expect(label).not.toHaveClass("activeThumbnail");
    expect(image).toHaveClass("inactiveThumbnail");
  });

  it("calls the 'updateStateForActiveThumbnailFunction' when clicked", async () => {
    render(
      <SliderThumbnail
        forAttribute="1"
        id="2"
        image={faker.image.urlLoremFlickr()}
        updateStateForActiveThumbnail={updateStateForActiveThumbnailFunction}
        setButtonIsChecked={false}
      />
    );

    const input = screen.getByRole("radio");
    await userEvent.click(input);

    expect(updateStateForActiveThumbnailFunction).toHaveBeenCalled();
  });
});
