import styles from './cta.module.scss';

const CTA: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Good news! We have 4 free legal consultation sessions for new clients!
      </h2>
      <button className={styles.button}>
        <span className={styles.buttonVisible}>Book now</span>
        <span className={styles.buttonInvisible}>Only 4 sessions left</span>
      </button>
    </div>
  );
};

export default CTA;
