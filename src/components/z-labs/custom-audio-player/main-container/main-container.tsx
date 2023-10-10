import styles from './main-container.module.scss';

const MainContainer = (props) => {
  return <div className={styles.musicContainer}>{props.children}</div>;
};

export default MainContainer;
