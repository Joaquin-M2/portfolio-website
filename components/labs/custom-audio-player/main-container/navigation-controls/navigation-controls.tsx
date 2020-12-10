import styles from './navigation-controls.module.scss';

const NavigationControls: React.FC = props => {
  return <div className={styles.songsNavigation}>{props.children}</div>;
};

export default NavigationControls;
