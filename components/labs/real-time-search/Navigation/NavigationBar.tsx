import styles from './NavigationBar.module.scss';

const NavBar = props => {
  return <nav className={styles.container}>{props.children}</nav>;
};

export default NavBar;
