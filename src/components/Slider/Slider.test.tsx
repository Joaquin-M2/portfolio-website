import { render, screen } from "@testing-library/react";
import Slider from "./Slider";
import { userEvent } from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

const nextProjectFunction = jest.fn();
const prevProjectFunction = jest.fn();

describe("<Slider /> component", () => {
  it("can be rendered", () => {
    render(
      <Slider
        activeThumbnail={1}
        imageSrc={faker.image.urlLoremFlickr()}
        liveProjectLink={faker.internet.url()}
        nextProject={nextProjectFunction}
        prevProject={prevProjectFunction}
        projectDescription={faker.lorem.sentence()}
        projectTitle={faker.lorem.text()}
        repositoryLink={faker.internet.url()}
      >
        Content
      </Slider>
    );

    const divContainer = screen.getByTestId("div");

    expect(divContainer).toBeInTheDocument();
  });

  /* it("calls the 'nextProjectFunction' function when the user drags the component to the left", async () => {
    render(
      <Slider
        activeThumbnail={1}
        imageSrc={faker.image.urlLoremFlickr()}
        liveProjectLink={faker.internet.url()}
        nextProject={nextProjectFunction}
        prevProject={prevProjectFunction}
        projectDescription={faker.lorem.sentence()}
        projectTitle={faker.lorem.text()}
        repositoryLink={faker.internet.url()}
      >
        Content
      </Slider>
    );

    const divContainer = screen.getByTestId("div");
    await userEvent.pointer([
      { keys: "[TouchA>]", target: divContainer },
      { pointerName: "TouchA", coords: { x: 300, y: 0 } },
      { keys: "[/TouchA]" },
    ]);

    expect(nextProjectFunction).toHaveBeenCalled();
  }); */

  /*  it("calls the 'prevProjectFunction' function when the user drags the component to the right", async () => {
    render(
      <Slider
        activeThumbnail={1}
        imageSrc={faker.image.urlLoremFlickr()}
        liveProjectLink={faker.internet.url()}
        nextProject={nextProjectFunction}
        prevProject={prevProjectFunction}
        projectDescription={faker.lorem.sentence()}
        projectTitle={faker.lorem.text()}
        repositoryLink={faker.internet.url()}
      >
        Content
      </Slider>
    );

    const divContainer = screen.getByTestId("div");
    await userEvent.
    
    expect(divContainer).toBeInTheDocument();
  }); */
});
