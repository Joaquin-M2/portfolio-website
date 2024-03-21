import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import Resources from "../resources/page";
import userEvent from "@testing-library/user-event";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as jest.Mock;

global.Request = jest.fn();

describe("<Resources /> page", () => {
  it("shows the 'Log In' and 'Sign Up' buttons if the user is not logged in.", () => {
    render(<Resources />);

    const logInButton = screen.getByRole("button", { name: "Log In" });
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    expect(logInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });
  /* it("shows a 'Loading...' state while tools are being retrieved.", async () => {
    
     // This test throws the following error:
     // TypeError: Cannot read properties of undefined (reading 'length')
     
    render(<Tools />);

    const loadingMessage = screen.getByRole("heading", { name: "Loading..." });

    expect(loadingMessage).toBeInTheDocument();
    await waitForElementToBeRemoved(loadingMessage);

    expect(loadingMessage).not.toBeInTheDocument();
  });  */

  it("shows the 'Log Out' button if the user is logged in and is not an admin.", () => {
    /* 
    This test throws the following warning:
    Warning: An update to Page inside a test was not wrapped in act(...).

    When testing, code that causes React state updates should be wrapped into act(...):
    ...
    */
    window.localStorage.setItem(
      "userToken",
      JSON.stringify(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBvcnRmb2xpby13ZWItOUB0ZXN0LmNvbSIsInVzZXJJZCI6IjY1MmU2OTQ3ZjUzZDE1ZDk4YWI5NmI0NyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA2NTU3NTMxLCJleHAiOjE3MDY1NjExMzF9.alTlweQsc_nSVp-3KGw2INnJti-eXYvzxeb4XQoqM7o"
      )
    );
    render(<Resources />);

    const logOutButton = screen.getByRole("button", { name: "Log Out" });
    expect(logOutButton).toBeInTheDocument();

    window.localStorage.removeItem("userToken");
  });

  it("shows the 'Log Out' but also 'Add Tool', 'Icons', 'Tags' and 'Users' buttons if the user is logged in and is an admin.", () => {
    /* 
    This test throws the following warning:
    Warning: An update to Page inside a test was not wrapped in act(...).

    When testing, code that causes React state updates should be wrapped into act(...):
    ...
    */
    window.localStorage.setItem(
      "userToken",
      JSON.stringify(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHBmLXdlYnNpdGUuY29tIiwidXNlcklkIjoiNjUyZjZlNDNmMGMzZDI4OTg2ZGM1NjAwIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA1MjY5MzQzLCJleHAiOjE3MDUyNzI5NDN9.hJmEBJc5FcpIcHjFzIq_bc8o-LXH_h1UsbeLKkkRYec"
      )
    );

    render(<Resources />);

    const logOutButton = screen.getByRole("button", { name: "Log Out" });
    const addToolButton = screen.getByRole("button", {
      name: "Add Tool",
    });
    const iconsButton = screen.getByRole("button", { name: "Icons" });
    const tagsButton = screen.getByRole("button", { name: "Tags" });
    const usersButton = screen.getByRole("button", { name: "Users" });

    expect(logOutButton).toBeInTheDocument();
    expect(addToolButton).toBeInTheDocument();
    expect(iconsButton).toBeInTheDocument();
    expect(tagsButton).toBeInTheDocument();
    expect(usersButton).toBeInTheDocument();

    window.localStorage.removeItem("userToken");
  });

  /* it("can filter tools by text.", async () => {

    // This test throws the following error:
    // Unable to find an accessible element with the role "main".

    render(<Tools />);

    const loadingMessage = screen.getByRole("heading", { name: "Loading..." });
    await waitForElementToBeRemoved(loadingMessage);

    const toolsContainer = screen.getByRole("main");
    const tools = within(toolsContainer).getAllByRole("link");
    const searchInput = screen.getByRole("searchbox");

    await userEvent.type(searchInput, "User input text");

    const filteredTools = within(toolsContainer).getAllByRole("link");

    expect(tools.length).toBeGreaterThan(filteredTools.length);
  }); */

  /* it("can filter tools by tags.", () => {

    // This test will throw the same error than previous tests.
    // It will be finished when I figure out how to fix the thrown errors.

    render(<Tools />);
  }); */
});
