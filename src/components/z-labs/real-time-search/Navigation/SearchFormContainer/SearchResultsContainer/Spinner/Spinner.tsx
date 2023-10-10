import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinnerShape}>
        <div className={styles.spinnerDot}></div>
        <div className={styles.spinnerDot}></div>
        <div className={styles.spinnerDot}></div>
        <div className={styles.spinnerDot}></div>
        <div className={styles.spinnerDot}></div>
        <div className={styles.spinnerDot}></div>
      </div>
    </div>
  );
};

export default Spinner;
