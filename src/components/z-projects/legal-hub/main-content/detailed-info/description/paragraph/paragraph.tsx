import styles from "./paragraph.module.scss";

interface ParagraphProps {
  children: JSX.Element | JSX.Element[] | string;
}

function Paragraph({ children }: ParagraphProps) {
  return <p className={styles.paragraph}>{children}</p>;
}

export default Paragraph;
