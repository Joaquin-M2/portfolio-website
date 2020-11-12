import styles from './header.module.scss';

import Logo from '../01.- Header/logo/logo';
import TextBox from '../01.- Header/text-box/text-box';

import Logotype from '../../../SVG-icons/portfolio/projects/TattooParlor/logotype';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo
      // logoPath="/projects/TattooParlor/logo-white.png"
      // imgAlt="Tattoo Parlor logo"
      />
      {/* <TextBox TopTitle="The Black Rose" SubTitle="Tattoo & Piercing studio" /> */}
      <TextBox
        TopTitle={<Logotype additionalStyles={styles.logotype} />}
        SubTitle={
          <span className={styles.subtitle}>
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
