import NavBar from "@/components/NavBar/NavBar";
import NavBarButton from "@/components/NavBar/NavBarButton/NavBarButton";

import styles from "./skills.module.scss";

function Layout({ children }) {
  return (
    <>
      <NavBar top narrow>
        <NavBarButton
          href="/skills/frontend"
          pathnameStartsWith="/skills/frontend"
          increasedBorderRadiusPosition="bottom-left"
        >
          Frontend
        </NavBarButton>
        <NavBarButton
          href="/skills/backend"
          pathnameStartsWith="/skills/backend"
          increasedBorderRadiusPosition="bottom-right"
        >
          Backend
        </NavBarButton>
      </NavBar>
      <div className={styles.wrapper}>{children}</div>
    </>
  );
}
export default Layout;
