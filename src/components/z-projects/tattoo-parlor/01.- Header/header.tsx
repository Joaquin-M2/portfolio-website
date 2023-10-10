import localFont from 'next/font/local';

import Logo from './logo/logo';
import TextBox from './text-box/text-box';

import Logotype from '../../../SVG-icons/portfolio/projects/TattooParlor/logotype';

import styles from './header.module.scss';

const neonFont = localFont({
  src: './neon_font-webfont.woff2',
  variable: '--neon-font',
});

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo
      // logoPath="/projects/TattooParlor/logo-white.png"
      // imgAlt="Tattoo Parlor logo"
      />
      <TextBox
        TopTitle={<Logotype additionalStyles={styles.logotype} />}
        SubTitle={
          <span className={`${styles.subtitle} ${neonFont.variable}`}>
            Tattoo__a<span className={styles.blinkingLetter_1}>n</span>d__Pier
            <span className={styles.blinkingLetter_2}>c</span>ing__studi
            <span className={styles.blinkingLetter_3}>o</span>
          </span>
        }
      />
    </header>
  );
};

export default Header;
