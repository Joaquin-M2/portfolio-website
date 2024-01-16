import { render, screen } from "@testing-library/react";
import NavBarButton from "./NavBarButton";

describe("<NavBarButton /> component", () => {
  it("can be rendered", () => {
    render(
      <NavBarButton
        href="https://portfolio-website-joaquin-m2.vercel.app/"
        pathnameStartsWith="/"
      >
        Button title
      </NavBarButton>
    );

    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
  });

  it("uses the 'active' styling if the user is in the page that the button links to", () => {
    render(
      <NavBarButton
        href="https://portfolio-website-joaquin-m2.vercel.app/"
        pathnameStartsWith="/"
      >
        Button title
      </NavBarButton>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("active");
  });

  it("does not use the 'active' styling if the user is in the page that the button links to", () => {
    render(
      <NavBarButton
        href="https://portfolio-website-joaquin-m2.vercel.app/"
        pathnameStartsWith="/tools"
      >
        Button title
      </NavBarButton>
    );

    const button = screen.getByRole("button");

    expect(button).not.toHaveClass("active");
  });

  it("can increase its border-radius on the top-left corner", () => {
    render(
      <NavBarButton
        href="https://portfolio-website-joaquin-m2.vercel.app/"
        pathnameStartsWith="/"
        increasedBorderRadiusPosition="top-left"
      >
        Button title
      </NavBarButton>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("increasedBorderRadiusTopLeft");
  });

  it("can increase its border-radius on the top-right corner", () => {
    render(
      <NavBarButton
        href="https://portfolio-website-joaquin-m2.vercel.app/"
        pathnameStartsWith="/"
        increasedBorderRadiusPosition="top-right"
      >
        Button title
      </NavBarButton>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("increasedBorderRadiusTopRight");
  });

  it("can increase its border-radius on the bottom-left corner", () => {
    render(
      <NavBarButton
        href="https://portfolio-website-joaquin-m2.vercel.app/"
        pathnameStartsWith="/"
        increasedBorderRadiusPosition="bottom-left"
      >
        Button title
      </NavBarButton>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("increasedBorderRadiusBottomLeft");
  });

  it("can increase its border-radius on the bottom-right corner", () => {
    render(
      <NavBarButton
        href="https://portfolio-website-joaquin-m2.vercel.app/"
        pathnameStartsWith="/"
        increasedBorderRadiusPosition="bottom-right"
      >
        Button title
      </NavBarButton>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("increasedBorderRadiusBottomRight");
  });
});
