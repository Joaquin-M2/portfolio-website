import { render, screen } from "@testing-library/react";
import SkillModal from "./SkillModal";
import userEvent from "@testing-library/user-event";

const closeFromButtonFunction = jest.fn();
const closeFromBackdropFunction = jest.fn();

describe("<SkillModal /> component", () => {
  it("can be rendered", () => {
    render(
      <SkillModal
        title="Dummy title"
        modalIsShown={true}
        closeFromButton={closeFromButtonFunction}
        closeFromBackdrop={closeFromBackdropFunction}
      >
        <p>SkillModal content</p>
      </SkillModal>
    );

    const skillModal = screen.getByRole("dialog");

    expect(skillModal).toBeInTheDocument();
  });

  it("can trigger the 'closeFromButton' function", async () => {
    render(
      <SkillModal
        title="Dummy title"
        modalIsShown={true}
        closeFromButton={closeFromButtonFunction}
        closeFromBackdrop={closeFromBackdropFunction}
      >
        <p>SkillModal content</p>
      </SkillModal>
    );

    const closeButton = screen.getByRole("button");
    await userEvent.click(closeButton);

    expect(closeFromButtonFunction).toHaveBeenCalled();
  });

  it("can trigger the 'closeFromBackdrop' function", async () => {
    render(
      <SkillModal
        title="Dummy title"
        modalIsShown={true}
        closeFromButton={closeFromButtonFunction}
        closeFromBackdrop={closeFromBackdropFunction}
      >
        <p>SkillModal content</p>
      </SkillModal>
    );

    const backdrop = screen.getByRole("presentation");
    await userEvent.click(backdrop);

    expect(closeFromBackdropFunction).toHaveBeenCalled();
  });
});
