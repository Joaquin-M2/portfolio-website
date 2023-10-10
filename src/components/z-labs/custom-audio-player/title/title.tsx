import styles from './title.module.scss';

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = props => {
  return <h1 className={styles.mainTitle}>{props.title}</h1>;
};

export default Title;
