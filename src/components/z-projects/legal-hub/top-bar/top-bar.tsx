import styles from './top-bar.module.scss';

import LH_Isotype from '../../../SVG-icons/portfolio/projects/LegalHub/isotype';
import SearchBar from './search-bar/search-bar';
import BookmarkIcon from '../../../SVG-icons/portfolio/projects/LegalHub/bookmark';
import MessagesIcon from '../../../SVG-icons/portfolio/projects/LegalHub/messages';

import AvatarImage from '../common/avatar-image/avatar-image';

const TopBar: React.FC = () => {
  return (
    <header className={styles.header}>
      <a href='#' className={styles.logoContainer}>
        <LH_Isotype additionalStyles={styles.logo} />
        Legal Hub
      </a>
      <SearchBar />
      <nav className={styles.userNav}>
        <div className={styles.userNav_iconBox}>
          <BookmarkIcon additionalStyles={styles.userNav_icon} />
          <span className={styles.userNav_icon_counter}>19</span>
        </div>
        <div className={styles.userNav_iconBox}>
          <MessagesIcon additionalStyles={styles.userNav_icon} />
          <span className={styles.userNav_icon_counter}>4</span>
        </div>
        <div className={styles.userNav_iconBox}>
          <AvatarImage
            src='/projects/legal-hub/user.jpg'
            alt='User avatar'
            additionalStyles={styles.userNav_picture}
          />
          <span className={styles.userNav_name}>Joaquín M2</span>
        </div>
      </nav>
    </header>
  );
};

export default TopBar;
