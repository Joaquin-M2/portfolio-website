import styles from './navigation-controls.module.scss';

const NavigationControls = (props) => {
  return <div className={styles.songsNavigation}>{props.children}</div>;
};

export default NavigationControls;
