import { render, screen } from "@testing-library/react";
import Modal from "./Modal";
import userEvent from "@testing-library/user-event";

const hideModalFunction = jest.fn();
const onSubmitFunction = jest.fn((e) => e.preventDefault());
const successfulBackendResponse = {
  status: 200,
  message: "Form submitted successfully!",
};
const failedBackendResponse = {
  status: 401,
  message: "Form submission failed.",
};

describe("<Modal /> component", () => {
  it("can be rendered", () => {
    render(
      <Modal title="Modal title" isShown hideModal={hideModalFunction}>
        <p>Modal content</p>
      </Modal>
    );

    const modal = screen.getByRole("dialog");

    expect(modal).toBeInTheDocument();
  });

  it("can be linked to a form", async () => {
    render(
      <Modal
        targetForm="1"
        acceptButtonTitle="Submit"
        title="Modal title"
        isShown
        hideModal={hideModalFunction}
      >
        <form id="1" onSubmit={onSubmitFunction}></form>
      </Modal>
    );

    const submitFormButton = screen.getByRole("button", { name: "Submit" });
    await userEvent.click(submitFormButton);

    expect(onSubmitFunction).toHaveBeenCalled();
  });

  it("closes the modal when clicking on the 'Close' button", async () => {
    render(
      <Modal
        cancelButtonTitle="Cancel"
        targetForm="1"
        acceptButtonTitle="Submit"
        title="Modal title"
        isShown
        hideModal={hideModalFunction}
      >
        <form id="1" onSubmit={onSubmitFunction}></form>
      </Modal>
    );

    const cancelFormButton = screen.getByRole("button", { name: "Cancel" });
    await userEvent.click(cancelFormButton);

    expect(hideModalFunction).toHaveBeenCalled();
  });

  it("replaces the 'acceptButton' and 'cancelButton' with 'closeButton' when the request is successful", async () => {
    render(
      <Modal
        requestIsSuccessful={true}
        cancelButtonTitle="Cancel"
        targetForm="1"
        acceptButtonTitle="Submit"
        title="Modal title"
        isShown
        hideModal={hideModalFunction}
      >
        <form id="1" onSubmit={onSubmitFunction}></form>
      </Modal>
    );

    const closeFormButton = screen.getByRole("button", { name: "Close" });
    await userEvent.click(closeFormButton);

    expect(hideModalFunction).toHaveBeenCalled();
  });

  it("can disable the 'acceptButton'", () => {
    render(
      <Modal
        acceptButtonIsDisabled={true}
        cancelButtonTitle="Cancel"
        targetForm="1"
        acceptButtonTitle="Submit"
        title="Modal title"
        isShown
        hideModal={hideModalFunction}
      >
        <form id="1" onSubmit={onSubmitFunction}></form>
      </Modal>
    );

    const submitFormButton = screen.getByRole("button", { name: "Submit" });

    expect(submitFormButton).toHaveClass("disabled");
  });

  it("shows a Success message if the backend response is successful", () => {
    render(
      <Modal
        backendResponse={successfulBackendResponse}
        requestIsSuccessful={true}
        cancelButtonTitle="Cancel"
        targetForm="1"
        acceptButtonTitle="Submit"
        title="Modal title"
        isShown
        hideModal={hideModalFunction}
      >
        <form id="1" onSubmit={onSubmitFunction}></form>
      </Modal>
    );

    const backendMessage = screen.getByRole("alert");

    expect(backendMessage).toHaveClass("backendResponseSuccess");
  });

  it("shows an Error message if the backend response is an error", () => {
    render(
      <Modal
        backendResponse={failedBackendResponse}
        cancelButtonTitle="Cancel"
        targetForm="1"
        acceptButtonTitle="Submit"
        title="Modal title"
        isShown
        hideModal={hideModalFunction}
      >
        <form id="1" onSubmit={onSubmitFunction}></form>
      </Modal>
    );

    const backendMessage = screen.getByRole("alert");

    expect(backendMessage).toHaveClass("backendResponseError");
  });
});
