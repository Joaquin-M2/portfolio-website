import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import UpdateResourceForm from "./UpdateResourceForm";

const hideModalFunction = jest.fn();
const randomTagsSet = new Set(
  Array(20)
    .fill(null)
    .map(() => faker.vehicle.manufacturer())
);

const randomTags = [...randomTagsSet]
  .sort((a, b) => a.localeCompare(b))
  .map((tagName) => ({
    name: tagName,
    _id: faker.string.uuid(),
  }));

const selectedTags = randomTags.splice(3, 5);

const randomIcons = Array(20)
  .fill(null)
  .map(() => ({
    name: faker.lorem.word(),
    url: faker.image.urlLoremFlickr(),
    _id: faker.database.mongodbObjectId(),
  }));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as jest.Mock;

global.Request = jest.fn();

describe("<UpdateResourceForm /> component", () => {
  it("can be rendered", () => {
    render(
      <UpdateResourceForm
        allIcons={randomIcons}
        allTags={randomTags}
        handleAddTag={() => {}}
        handleRemoveTag={() => {}}
        selectedTagsAddToolForm={selectedTags}
        requestMethod="GET"
        requestUrlPath="#"
        formIsOpen={true}
        hideModal={hideModalFunction}
        id="1"
        setToolsFrontend={() => {}}
      />
    );

    const form = screen.getByRole("form");

    expect(form).toBeInTheDocument();
  });
});
