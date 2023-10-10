import styles from './navBar.module.scss';

interface NavBarProps {
  additionalStyles?: string;
  top?: boolean;
  narrow?: boolean;
  children: JSX.Element | JSX.Element[];
}

function NavBar({ children, additionalStyles, top, narrow }: NavBarProps) {
  // useEffect(() => {
  //     const navBarBottom = document.getElementById('navBarBottom');
  //     let currentPath = window.location.pathname.substring(1, 5)
  //     // TRATAR DE CAMBIAR EL ESTILO DEL BOTÓN DEL MENÚ OPORTUNO EN BASE AL CURRENT PATH
  //     console.log(currentPath)
  // }, [])

  return (
    <div
      className={`${styles.container} ${top && styles.containerTop} ${
        narrow && styles.containerNarrow
      }`}
    >
      <nav
        className={`${styles.navBarBottom} ${additionalStyles} ${
          top && styles.navBarTop
        } ${narrow && styles.narrow}`}
        id='navBarBottom'
      >
        {children}
        {/* <Link href='/portfolio/projects'>
        <Button_NavBarBottom
          additionalStyles={`${styles.firstButton} ${
            pathname.startsWith('/portfolio') ? styles.active : null
          }`}
        >
          Portfolio
        </Button_NavBarBottom>
      </Link>
      <Link href='/skills/frontend'>
        <Button_NavBarBottom
          additionalStyles={
            pathname.startsWith('/skills') ? styles.active : null
          }
        >
          Skills
        </Button_NavBarBottom>
      </Link>
      <Link href='/'>
        <Button_NavBarBottom
          additionalStyles={pathname === '/' ? styles.active : null}
        >
          LOGO
        </Button_NavBarBottom>
      </Link>
      <Link href='/contact'>
        <Button_NavBarBottom
          additionalStyles={pathname === '/contact' ? styles.active : null}
        >
          Contact
        </Button_NavBarBottom>
      </Link>
      <Link href='/tools'>
        <Button_NavBarBottom
          //additionalStyles={`${styles.lastButton} ${styles.disabledButton}`}
          additionalStyles={`${styles.lastButton} ${
            pathname.startsWith('/tools') ? styles.active : null
          }`}
        >
          Tools
        </Button_NavBarBottom>
      </Link> */}
      </nav>
    </div>
  );
}

export default NavBar;
