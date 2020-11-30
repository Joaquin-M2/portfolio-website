import Link from 'next/link';
import { useRouter } from 'next/router';
import Button_NavBarBottom from './button/button';

import styles from './nav-bar-bottom.module.scss';

function NavBarBottom(props) {
  // useEffect(() => {
  //     const navBarBottom = document.getElementById('navBarBottom');
  //     let currentPath = window.location.pathname.substring(1, 5)
  //     // TRATAR DE CAMBIAR EL ESTILO DEL BOTÓN DEL MENÚ OPORTUNO EN BASE AL CURRENT PATH
  //     console.log(currentPath)
  // }, [])

  const router = useRouter();

  return (
    <nav
      className={`${styles.navBarBottom} ${props.additionalStyles}`}
      id="navBarBottom"
    >
      <Link href="/portfolio/projects">
        <a>
          <Button_NavBarBottom
            additionalStyles={`${styles.firstButton} ${
              router.pathname.startsWith('/portfolio') ? styles.active : null
            }`}
          >
            Portfolio
          </Button_NavBarBottom>
        </a>
      </Link>
      <Link href="/skills/frontend">
        <a>
          <Button_NavBarBottom
            additionalStyles={
              router.pathname.startsWith('/skills') ? styles.active : null
            }
          >
            Skills
          </Button_NavBarBottom>
        </a>
      </Link>
      <Link href="/">
        <a>
          <Button_NavBarBottom
            additionalStyles={router.pathname === '/' ? styles.active : null}
          >
            LOGO
          </Button_NavBarBottom>
        </a>
      </Link>
      <Link href="/contact">
        <a>
          <Button_NavBarBottom
            additionalStyles={
              router.pathname === '/contact' ? styles.active : null
            }
          >
            Contact
          </Button_NavBarBottom>
        </a>
      </Link>
      {/* <Link href="/web-development-notes">
        <a> */}
      <Button_NavBarBottom
        additionalStyles={`${styles.lastButton} ${styles.disabledButton}`}
        // additionalStyles={`${styles.lastButton} ${styles.disabledButton} ${
        //   router.pathname.startsWith('/web-development-notes')
        //     ? styles.active
        //     : null
        // }`}
      >
        WD Notes
      </Button_NavBarBottom>
      {/* </a>
      </Link> */}
    </nav>
  );
}

export default NavBarBottom;
