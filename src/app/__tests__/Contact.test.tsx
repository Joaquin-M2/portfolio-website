import { render, screen } from "@testing-library/react";
import Contact from "../contact/page";

describe("<Contact /> page", () => {
  it("can be rendered", () => {
    render(<Contact />);

    const form = screen.getByRole("form");
    const contactLinks = screen.getAllByRole("link");

    expect(form).toBeInTheDocument();
    expect(contactLinks.length).toBeGreaterThanOrEqual(3); // Email address, LinkedIn and GitHub.
  });
});
