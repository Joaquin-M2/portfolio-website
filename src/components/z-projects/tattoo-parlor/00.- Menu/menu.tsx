import styles from './menu.module.scss';

interface MenuProps {
  children: JSX.Element[];
}

const Menu: React.FC<MenuProps> = (props) => {
  return (
    <div className={styles.nav}>
      <input type="checkbox" className={styles.navCheckbox} id="navi-toggle" />
      <label htmlFor="navi-toggle" className={styles.navButton}>
        <span className={styles.navIcon}>&nbsp;</span>
      </label>
      <div className={styles.navBackground}>&nbsp;</div>
      <nav className={styles.navNav}>
        <ul className={styles.navList}>{props.children}</ul>
      </nav>
    </div>
  );
};

export default Menu;
