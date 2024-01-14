import { render, screen, within } from "@testing-library/react";
import Input from "./Input";

describe("<Input /> component", () => {
  it("uses the placeholder as label text", () => {
    const placeholderText = "Testing input";
    render(
      <Input
        type="text"
        placeholder={placeholderText}
        id="1"
        formIsOpen
        watchedValue="T"
      />
    );

    const inputField = screen.getByLabelText(placeholderText);

    expect(inputField).toBeInTheDocument();
  });

  it("can be of type text, and uses some 'success' styling if the input is > 2 and < 50 characters", () => {
    render(
      <Input
        type="text"
        placeholder="Testing input"
        id="1"
        formIsOpen
        watchedValue="Text for input testing"
      />
    );

    const inputField = screen.getByRole("textbox");
    // The "watchedValue" prop refers to what the user wrote in the input field. Required due to...
    //... the React Hook Form. For that reason "userEvent" wouldn't work for this test.

    expect(inputField).toHaveClass("success");
  });

  it("uses some 'error' styling if the input (type text) is < 2 characters", () => {
    render(
      <Input
        type="text"
        placeholder="Testing input"
        id="1"
        formIsOpen
        watchedValue="T"
      />
    );

    const inputField = screen.getByRole("textbox");

    expect(inputField).toHaveClass("error");
  });

  it("uses some 'error' styling if the input (type text) is > 50 characters", () => {
    render(
      <Input
        type="text"
        placeholder="Testing input"
        id="1"
        formIsOpen
        watchedValue="Donec velit velit, sagittis quis dictum a, cursus in dolor. Pellentesque vel ligula quis lectus interdum molestie et sit amet risus. Maecenas eu luctus est."
      />
    );

    const inputField = screen.getByRole("textbox");

    expect(inputField).toHaveClass("error");
  });

  it("shows an error message if validation fails", () => {
    render(
      <Input
        type="text"
        placeholder="Testing input"
        id="1"
        formIsOpen
        watchedValue="T"
        error="Error message"
      />
    );

    const errorMessage = screen.getByRole("alert");

    expect(errorMessage).toHaveClass("errorMessage");
  });

  it("can be a <textarea>, and uses some 'success' styling if the input is > 10 and < 250 characters", () => {
    render(
      <Input
        type="textarea"
        placeholder="Testing input"
        id="1"
        formIsOpen
        watchedValue="Text for input testing"
      />
    );

    const inputField = screen.getByRole("textbox");
    // The "watchedValue" prop refers to what the user wrote in the input field. Required due to...
    //... the React Hook Form. For that reason "userEvent" wouldn't work for this test.

    expect(inputField).toHaveClass("success");
  });

  it("uses some 'error' styling if the input (type text) is < 10 characters", () => {
    render(
      <Input
        type="textarea"
        placeholder="Testing input"
        id="1"
        formIsOpen
        watchedValue="Test"
      />
    );

    const inputField = screen.getByRole("textbox");

    expect(inputField).toHaveClass("error");
  });

  it("uses some 'error' styling if the input (type text) is > 250 characters", () => {
    render(
      <Input
        type="textarea"
        placeholder="Testing input"
        id="1"
        formIsOpen
        watchedValue="Praesent ex orci, consequat eu leo a, aliquam luctus nibh. Praesent facilisis aliquam vehicula. Aenean vulputate velit vel enim eleifend egestas. Proin vel fringilla est, eu ullamcorper massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra."
      />
    );

    const inputField = screen.getByRole("textbox");

    expect(inputField).toHaveClass("error");
  });

  it("can be of type email, and uses some 'success' styling if the email format is valid (<username>@<domain>)", () => {
    render(
      <Input
        type="email"
        placeholder="Testing input"
        id="1"
        formIsOpen
        watchedValue="user@test.com"
      />
    );

    const inputField = screen.getByRole("textbox");
    // The "watchedValue" prop refers to what the user wrote in the input field. Required due to...
    //... the React Hook Form. For that reason "userEvent" wouldn't work for this test.

    expect(inputField).toHaveClass("success");
  });

  it("uses some 'error' styling if the input (type email) doesn't use the correct format (<username>@<domain>)", () => {
    render(
      <Input
        type="email"
        placeholder="Testing input"
        id="1"
        formIsOpen
        watchedValue="user@test"
      />
    );

    const inputField = screen.getByRole("textbox");

    expect(inputField).toHaveClass("error");
  });

  it("can be of type password, and uses some 'success' styling if the input is > 6 and < 20 characters", () => {
    render(
      <Input
        type="password"
        placeholder="Placeholder, which also is label"
        id="1"
        formIsOpen
        watchedValue="Test password"
      />
    );

    const inputField = screen.getByLabelText(
      "Placeholder, which also is label"
    );

    expect(inputField).toHaveClass("success");
  });

  it("uses some 'error' styling if the input (type text) is < 6 characters", () => {
    render(
      <Input
        type="password"
        placeholder="Placeholder, which also is label"
        id="1"
        formIsOpen
        watchedValue="Psw"
      />
    );

    const inputField = screen.getByLabelText(
      "Placeholder, which also is label"
    );

    expect(inputField).toHaveClass("error");
  });

  it("uses some 'error' styling if the input (type text) is > 20 characters", () => {
    render(
      <Input
        type="password"
        placeholder="Placeholder, which also is label"
        id="1"
        formIsOpen
        watchedValue="Long password with more than 20 characters"
      />
    );

    const inputField = screen.getByLabelText(
      "Placeholder, which also is label"
    );

    expect(inputField).toHaveClass("error");
  });

  it("can be of type url, and uses some 'success' styling if the url format is right", () => {
    render(
      <Input
        type="url"
        placeholder="Testing input"
        id="1"
        formIsOpen
        watchedValue="https://portfolio-website-joaquin-m2.vercel.app/"
      />
    );

    const inputField = screen.getByRole("textbox");

    expect(inputField).toHaveClass("success");
  });

  it("uses some 'error' styling if the url format is wrong", () => {
    render(
      <Input
        type="url"
        placeholder="Testing input"
        id="1"
        formIsOpen
        watchedValue="portfolio-website-joaquin-m2."
      />
    );

    const inputField = screen.getByRole("textbox");

    expect(inputField).toHaveClass("error");
  });

  it("can be of type selectMultiple (<select multiple></select>)", () => {
    const availableOptions = [
      { _id: "1", name: "Option #1" },
      { _id: "2", name: "Option #2" },
      { _id: "3", name: "Option #3" },
    ];
    const selectedOptions = [
      { _id: "2", name: "Option #2" },
      { _id: "3", name: "Option #3" },
    ];
    render(
      <Input
        type="selectMultiple"
        placeholder="Testing input"
        id="1"
        formIsOpen
        allOptions={availableOptions}
        selectedTagsAddToolForm={selectedOptions}
        watchedValue={selectedOptions}
      />
    );

    const selectionsContainer = screen.getByRole("list");
    const selections = within(selectionsContainer).getAllByRole("listitem");

    expect(selections).toHaveLength(selectedOptions.length);
  });

  it("can be of type selectSingle (<select></select>)", () => {
    const availableOptions = [
      { _id: "1", name: "Option #1" },
      { _id: "2", name: "Option #2" },
      { _id: "3", name: "Option #3" },
    ];
    const selectedOption = [{ _id: "2", name: "Option #2" }];
    render(
      <Input
        type="selectSingle"
        placeholder="Testing input"
        id="1"
        formIsOpen
        allOptions={availableOptions}
        watchedValue={selectedOption}
      />
    );

    const options = screen.getByRole("combobox");

    expect(options).toHaveLength(availableOptions.length);
  });
});
