import { render, screen } from "@testing-library/react";
import Tongue from "./Tongue";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("<Tongue /> component", () => {
  it("can be a 'Return' button'", () => {
    render(<Tongue />);

    const tongue = screen.getByText("Return");

    expect(tongue).toBeInTheDocument();
  });

  it("can be a 'Check the code' (GitHub) button'", () => {
    render(<Tongue isGithubLink />);

    const tongue = screen.getByText("Check the code");

    expect(tongue).toBeInTheDocument();
  });
});
