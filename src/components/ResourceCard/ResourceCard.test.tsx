import { render, screen, within } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import ResourceCard from "./ResourceCard";

const hideDeleteToolModalFunction = jest.fn();
const hideUpdateToolModalFunction = jest.fn();
const setDeleteToolModalIsShownFunction = jest.fn();
const setUpdateToolModalIsShownFunction = jest.fn();

const toolTags = [
  {
    _id: "1",
    name: "Option #1",
  },
  {
    _id: "3",
    name: "Option #3",
  },
];

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

describe("<ResourceCard /> component", () => {
  it("can be rendered", () => {
    render(
      <ResourceCard
        deleteToolModalIsShown={false}
        hideDeleteToolModal={hideDeleteToolModalFunction}
        setDeleteToolModalIsShown={() => {}}
        allIcons={randomIcons}
        allTags={randomTags}
        selectedTagsAddToolForm={selectedTags}
        updateToolModalIsShown={false}
        hideUpdateToolModal={hideUpdateToolModalFunction}
        setUpdateToolModalIsShown={() => {}}
        handleAddTag={() => {}}
        handleRemoveTag={() => {}}
        setToolsFrontend={() => {}}
        id="1"
        key={1}
        logo={faker.image.urlLoremFlickr()}
        toolTags={toolTags}
        title="Tool title"
        description="Tool description"
        userAllFavoriteTools={["1"]}
        url={faker.internet.url()}
      />
    );

    const toolCard = screen.getByRole("link");

    expect(toolCard).toBeInTheDocument();
  });

  it("has a title", () => {
    render(
      <ResourceCard
        deleteToolModalIsShown={false}
        hideDeleteToolModal={hideDeleteToolModalFunction}
        setDeleteToolModalIsShown={() => {}}
        allIcons={randomIcons}
        allTags={randomTags}
        selectedTagsAddToolForm={selectedTags}
        updateToolModalIsShown={false}
        hideUpdateToolModal={hideUpdateToolModalFunction}
        setUpdateToolModalIsShown={() => {}}
        handleAddTag={() => {}}
        handleRemoveTag={() => {}}
        setToolsFrontend={() => {}}
        id="1"
        key={1}
        logo={faker.image.urlLoremFlickr()}
        toolTags={toolTags}
        title="Tool title"
        description="Tool description"
        userAllFavoriteTools={["1"]}
        url={faker.internet.url()}
      />
    );

    const title = screen.getByRole("heading", { name: "Tool title" });

    expect(title).toBeInTheDocument();
  });

  it("has a description", () => {
    render(
      <ResourceCard
        deleteToolModalIsShown={false}
        hideDeleteToolModal={hideDeleteToolModalFunction}
        setDeleteToolModalIsShown={() => {}}
        allIcons={randomIcons}
        allTags={randomTags}
        selectedTagsAddToolForm={selectedTags}
        updateToolModalIsShown={false}
        hideUpdateToolModal={hideUpdateToolModalFunction}
        setUpdateToolModalIsShown={() => {}}
        handleAddTag={() => {}}
        handleRemoveTag={() => {}}
        setToolsFrontend={() => {}}
        id="1"
        key={1}
        logo={faker.image.urlLoremFlickr()}
        toolTags={toolTags}
        title="Tool title"
        description="Tool description"
        userAllFavoriteTools={["1"]}
        url={faker.internet.url()}
      />
    );

    const description = screen.getByRole("paragraph");

    expect(description).toBeInTheDocument();
  });

  it("has a tool image", () => {
    render(
      <ResourceCard
        deleteToolModalIsShown={false}
        hideDeleteToolModal={hideDeleteToolModalFunction}
        setDeleteToolModalIsShown={() => {}}
        allIcons={randomIcons}
        allTags={randomTags}
        selectedTagsAddToolForm={selectedTags}
        updateToolModalIsShown={false}
        hideUpdateToolModal={hideUpdateToolModalFunction}
        setUpdateToolModalIsShown={() => {}}
        handleAddTag={() => {}}
        handleRemoveTag={() => {}}
        setToolsFrontend={() => {}}
        id="1"
        key={1}
        logo={faker.image.urlLoremFlickr()}
        toolTags={toolTags}
        title="Tool title"
        description="Tool description"
        userAllFavoriteTools={["1"]}
        url={faker.internet.url()}
      />
    );

    const toolImage = screen.getByRole("img", {
      name: `Logo image of the ${"Tool title"} tool.`,
    });

    expect(toolImage).toBeInTheDocument();
  });

  it("has as many tags as those set in the 'toolTags' prop", () => {
    render(
      <ResourceCard
        deleteToolModalIsShown={false}
        hideDeleteToolModal={hideDeleteToolModalFunction}
        setDeleteToolModalIsShown={() => {}}
        allIcons={randomIcons}
        allTags={randomTags}
        selectedTagsAddToolForm={selectedTags}
        updateToolModalIsShown={false}
        hideUpdateToolModal={hideUpdateToolModalFunction}
        setUpdateToolModalIsShown={() => {}}
        handleAddTag={() => {}}
        handleRemoveTag={() => {}}
        setToolsFrontend={() => {}}
        id="1"
        key={1}
        logo={faker.image.urlLoremFlickr()}
        toolTags={toolTags}
        title="Tool title"
        description="Tool description"
        userAllFavoriteTools={["1"]}
        url={faker.internet.url()}
      />
    );

    const tagsAssignedToTool = screen.getAllByRole("list")[0];
    const tags = within(tagsAssignedToTool).getAllByRole("listitem");

    expect(tags).toHaveLength(toolTags.length);
  });

  it("only has one button (Favorite) if the user doesn't have the 'admin' role", () => {
    render(
      <ResourceCard
        deleteToolModalIsShown={false}
        hideDeleteToolModal={hideDeleteToolModalFunction}
        setDeleteToolModalIsShown={() => {}}
        allIcons={randomIcons}
        allTags={randomTags}
        selectedTagsAddToolForm={selectedTags}
        updateToolModalIsShown={false}
        hideUpdateToolModal={hideUpdateToolModalFunction}
        setUpdateToolModalIsShown={() => {}}
        handleAddTag={() => {}}
        handleRemoveTag={() => {}}
        setToolsFrontend={() => {}}
        id="1"
        key={1}
        logo={faker.image.urlLoremFlickr()}
        toolTags={toolTags}
        title="Tool title"
        description="Tool description"
        userAllFavoriteTools={["1"]}
        url={faker.internet.url()}
      />
    );

    const iconsContainer = screen.getByTestId("iconsContainer");
    const toolManagementIcons = within(iconsContainer).getAllByRole("button");
    expect(toolManagementIcons).toHaveLength(1);
  });

  it("has a 'MenuCard' if the user has the 'admin' role", () => {
    window.localStorage.setItem(
      "userToken",
      JSON.stringify(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHBmLXdlYnNpdGUuY29tIiwidXNlcklkIjoiNjUyZjZlNDNmMGMzZDI4OTg2ZGM1NjAwIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1MjY5MzQzLCJleHAiOjE3MDUyNzI5NDN9.hJmEBJc5FcpIcHjFzIq_bc8o-LXH_h1UsbeLKkkRYec"
      )
    );
    render(
      <ResourceCard
        deleteToolModalIsShown={false}
        hideDeleteToolModal={hideDeleteToolModalFunction}
        setDeleteToolModalIsShown={() => {}}
        allIcons={randomIcons}
        allTags={randomTags}
        selectedTagsAddToolForm={selectedTags}
        updateToolModalIsShown={false}
        hideUpdateToolModal={hideUpdateToolModalFunction}
        setUpdateToolModalIsShown={() => {}}
        handleAddTag={() => {}}
        handleRemoveTag={() => {}}
        setToolsFrontend={() => {}}
        id="1"
        key={1}
        logo={faker.image.urlLoremFlickr()}
        toolTags={toolTags}
        title="Tool title"
        description="Tool description"
        userAllFavoriteTools={["1"]}
        url={faker.internet.url()}
      />
    );

    const iconsContainer = screen.getByTestId("iconsContainer");
    const toolManagementIcons = within(iconsContainer).getAllByRole("button");
    expect(toolManagementIcons).toHaveLength(2);

    window.localStorage.removeItem("userToken");
  });

  it("can call the 'setUpdateToolModalIsShownFunction' function", async () => {
    window.localStorage.setItem(
      "userToken",
      JSON.stringify(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHBmLXdlYnNpdGUuY29tIiwidXNlcklkIjoiNjUyZjZlNDNmMGMzZDI4OTg2ZGM1NjAwIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1MjY5MzQzLCJleHAiOjE3MDUyNzI5NDN9.hJmEBJc5FcpIcHjFzIq_bc8o-LXH_h1UsbeLKkkRYec"
      )
    );
    render(
      <ResourceCard
        deleteToolModalIsShown={false}
        hideDeleteToolModal={hideDeleteToolModalFunction}
        setDeleteToolModalIsShown={setDeleteToolModalIsShownFunction}
        allIcons={randomIcons}
        allTags={randomTags}
        selectedTagsAddToolForm={selectedTags}
        updateToolModalIsShown={false}
        hideUpdateToolModal={hideUpdateToolModalFunction}
        setUpdateToolModalIsShown={setUpdateToolModalIsShownFunction}
        handleAddTag={() => {}}
        handleRemoveTag={() => {}}
        setToolsFrontend={() => {}}
        id="1"
        key={1}
        logo={faker.image.urlLoremFlickr()}
        toolTags={toolTags}
        title="Tool title"
        description="Tool description"
        userAllFavoriteTools={["1"]}
        url={faker.internet.url()}
      />
    );

    const iconsContainer = screen.getByTestId("iconsContainer");
    const toolConfigurationIcon =
      within(iconsContainer).getAllByRole("button")[1];
    await userEvent.click(toolConfigurationIcon);
    const modifyToolButton = within(iconsContainer).getAllByRole("listitem")[0];
    await userEvent.click(modifyToolButton);

    expect(setUpdateToolModalIsShownFunction).toHaveBeenCalled();

    window.localStorage.removeItem("userToken");
  });

  it("can call the 'setDeleteToolModalIsShownFunction' function", async () => {
    window.localStorage.setItem(
      "userToken",
      JSON.stringify(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHBmLXdlYnNpdGUuY29tIiwidXNlcklkIjoiNjUyZjZlNDNmMGMzZDI4OTg2ZGM1NjAwIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1MjY5MzQzLCJleHAiOjE3MDUyNzI5NDN9.hJmEBJc5FcpIcHjFzIq_bc8o-LXH_h1UsbeLKkkRYec"
      )
    );
    render(
      <ResourceCard
        deleteToolModalIsShown={false}
        hideDeleteToolModal={hideDeleteToolModalFunction}
        setDeleteToolModalIsShown={setDeleteToolModalIsShownFunction}
        allIcons={randomIcons}
        allTags={randomTags}
        selectedTagsAddToolForm={selectedTags}
        updateToolModalIsShown={false}
        hideUpdateToolModal={hideUpdateToolModalFunction}
        setUpdateToolModalIsShown={setUpdateToolModalIsShownFunction}
        handleAddTag={() => {}}
        handleRemoveTag={() => {}}
        setToolsFrontend={() => {}}
        id="1"
        key={1}
        logo={faker.image.urlLoremFlickr()}
        toolTags={toolTags}
        title="Tool title"
        description="Tool description"
        userAllFavoriteTools={["1"]}
        url={faker.internet.url()}
      />
    );

    const iconsContainer = screen.getByTestId("iconsContainer");
    const toolConfigurationIcon =
      within(iconsContainer).getAllByRole("button")[1];
    await userEvent.click(toolConfigurationIcon);
    const deleteToolButton = within(iconsContainer).getAllByRole("listitem")[1];
    await userEvent.click(deleteToolButton);

    expect(setDeleteToolModalIsShownFunction).toHaveBeenCalled();

    window.localStorage.removeItem("userToken");
  });
});
