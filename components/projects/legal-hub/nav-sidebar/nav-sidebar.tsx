import styles from './nav-sidebar.module.scss';

import NavButton from './nav-button/nav-button';
import DescriptionIcon from '../../../SVG-icons/portfolio/projects/LegalHub/NavSidebar/description';
import AvailabilityIcon from '../../../SVG-icons/portfolio/projects/LegalHub/NavSidebar/availability';
import CommentsIcon from '../../../SVG-icons/portfolio/projects/LegalHub/NavSidebar/comments';
import ContactIcon from '../../../SVG-icons/portfolio/projects/LegalHub/NavSidebar/contact';

const NavSidebar: React.FC = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.navButtonsList}>
        <NavButton
          active={true}
          link="#"
          icon={<DescriptionIcon />}
          buttonName="Description"
        />
        <NavButton
          link="#"
          icon={<AvailabilityIcon />}
          buttonName="Availability"
        />
        <NavButton link="#" icon={<CommentsIcon />} buttonName="Comments" />
        <NavButton link="#" icon={<ContactIcon />} buttonName="Contact" />
      </ul>
      <div className={styles.legalNotice}>
        <p>
          &copy; 2020 by Legal Hub.
          <br />
          All rights reserved.
        </p>
      </div>
    </nav>
  );
};

export default NavSidebar;
