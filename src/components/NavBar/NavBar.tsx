import styles from "./navBar.module.scss";

interface NavBarProps {
  additionalStyles?: string;
  top?: boolean;
  narrow?: boolean;
  children: JSX.Element | JSX.Element[];
}

function NavBar({ children, additionalStyles, top, narrow }: NavBarProps) {
  return (
    <div
      data-testid="navBarWrapperDiv"
      className={`${styles.container} ${top && styles.containerTop} ${
        narrow && styles.containerNarrow
      }`}
    >
      <nav
        className={`${styles.navBarBottom} ${additionalStyles} ${
          top && styles.navBarTop
        } ${narrow && styles.narrow}`}
        id="navBarBottom"
      >
        {children}
      </nav>
    </div>
  );
}

export default NavBar;
