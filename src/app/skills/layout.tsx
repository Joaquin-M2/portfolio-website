import NavBar from '../../components/NavBar/NavBar';
import NavBarButton from '../../components/NavBar/NavBarButton/NavBarButton';

function Layout({ children }) {
  return (
    <>
      <NavBar top narrow>
        <NavBarButton
          href='/skills/frontend'
          pathnameStartsWith='/skills/frontend'
          borderRadiusPosition='bottom-left'
        >
          Frontend
        </NavBarButton>
        <NavBarButton
          href='/skills/backend'
          pathnameStartsWith='/skills/backend'
          borderRadiusPosition='bottom-right'
        >
          Backend
        </NavBarButton>
      </NavBar>
      {children}
    </>
  );
}
export default Layout;
