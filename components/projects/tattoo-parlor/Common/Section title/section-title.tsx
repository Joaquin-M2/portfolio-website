import styles from './section-title.module.scss';

interface SectionTitleProps {
  additionalStyles?: string;
  children: string;
}

const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  return (
    <div className={`${styles.titleContainer} ${props.additionalStyles}`}>
      <h2 className={styles.title}>{props.children}</h2>
    </div>
  );
};

export default SectionTitle;
