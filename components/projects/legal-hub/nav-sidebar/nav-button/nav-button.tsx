import styles from './nav-button.module.scss';

interface NavButtonProps {
  active?: boolean;
  link: string;
  icon: JSX.Element;
  buttonName: string;
}

const NavButton: React.FC<NavButtonProps> = props => {
  return (
    <li
      className={`${styles.containerButton} ${
        props.active === true ? styles.containerButtonActive : null
      }`}
    >
      <a href={props.link} className={styles.buttonLink}>
        {props.icon}
        <span>{props.buttonName}</span>
      </a>
    </li>
  );
};

export default NavButton;
