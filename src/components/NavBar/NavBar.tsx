import styles from "./navBar.module.scss";

interface NavBarProps {
  additionalStyles?: string;
  children: JSX.Element | JSX.Element[];
  leftSided?: boolean;
  narrow?: boolean;
  rightSided?: boolean;
  top?: boolean;
}

function NavBar({
  additionalStyles,
  children,
  leftSided,
  narrow,
  rightSided,
  top,
}: NavBarProps) {
  return (
    <div
      data-testid="navBarWrapperDiv"
      className={`${styles.container} ${top && styles.containerTop} ${
        narrow && styles.containerNarrow
      } ${leftSided && styles.leftSided} ${rightSided && styles.rightSided}`}
    >
      <nav
        className={`${styles.navBarBottom} ${additionalStyles} ${
          top && styles.navBarTop
        } ${narrow && styles.narrow}`}
        id="navBarBottom"
      >
        <div
          className={`${styles.buttonsContainer} ${
            top && styles.buttonsContainerTop
          }`}
        >
          {children}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
