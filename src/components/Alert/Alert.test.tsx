import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

const mockedBackendResponseSucceed = { message: "Test", status: 200 };
const mockedBackendResponseFailed = { message: "Test", status: 401 };

describe("<Alert /> component", () => {
  it("has an alert message", () => {
    render(<Alert backendResponse={mockedBackendResponseSucceed} />);

    const alertText = screen.getByRole("alert", {
      name: mockedBackendResponseSucceed.message,
    });

    expect(alertText).toBeInTheDocument();
    expect(alertText).toHaveTextContent(mockedBackendResponseSucceed.message);
  });

  it("has a success message if the backend request is successful", () => {
    render(<Alert backendResponse={mockedBackendResponseSucceed} />);

    const alertText = screen.getByRole("alert", {
      name: mockedBackendResponseSucceed.message,
    });

    expect(alertText).toHaveClass("success");
  });

  it("has an error message if the backend request failed", () => {
    render(<Alert backendResponse={mockedBackendResponseFailed} />);

    const alertText = screen.getByRole("alert", {
      name: mockedBackendResponseFailed.message,
    });

    expect(alertText).toHaveClass("error");
  });
});
