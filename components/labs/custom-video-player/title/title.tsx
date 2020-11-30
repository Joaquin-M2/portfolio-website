import styles from './title.module.scss';

const Title: React.FC = props => {
  return <h1 className={styles.title}>{props.children}</h1>;
};

export default Title;
