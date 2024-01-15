import NavBar from "@/components/NavBar/NavBar";
import NavBarButton from "@/components/NavBar/NavBarButton/NavBarButton";

function Layout({ children }) {
  return (
    <>
      <NavBar top narrow>
        <NavBarButton
          href="/portfolio/projects"
          pathnameStartsWith="/portfolio/projects"
          increasedBorderRadiusPosition="bottom-left"
        >
          Projects
        </NavBarButton>
        <NavBarButton
          href="/portfolio/labs"
          pathnameStartsWith="/portfolio/labs"
          increasedBorderRadiusPosition="bottom-right"
        >
          Labs
        </NavBarButton>
      </NavBar>
      {children}
    </>
  );
}
export default Layout;
