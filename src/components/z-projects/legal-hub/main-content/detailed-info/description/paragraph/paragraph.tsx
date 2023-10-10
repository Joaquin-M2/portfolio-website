import styles from './paragraph.module.scss';

const Paragraph: React.FC = props => {
  return <p className={styles.paragraph}>{props.children}</p>;
};

export default Paragraph;
