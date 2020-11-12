import styles from './text-block.module.scss';

interface ParagraphWithTitleProps {
  title: string;
  children: string;
}

const ParagraphWithTitle: React.FC<ParagraphWithTitleProps> = (props) => {
  return (
    <>
      <h3 className={styles.title}>{props.title}</h3>
      <p className={styles.paragraph}>{props.children}</p>
    </>
  );
};

export default ParagraphWithTitle;
