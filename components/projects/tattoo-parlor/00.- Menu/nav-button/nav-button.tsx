import styles from './nav-button.module.scss';

interface NavButtonProps {
  number: string;
  path: string;
  children: string;
}

const NavButton: React.FC<NavButtonProps> = (props) => {
  return (
    <li className={styles.navItem}>
      <a href={props.path} className={styles.navLink}>
        <span>{props.number}</span>
        {props.children}
      </a>
    </li>
  );
};

export default NavButton;
