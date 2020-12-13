import styles from './NoResults.module.scss';

const NoResults = () => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>
        No results found.
        <br />
        Try another search.
      </p>
    </div>
  );
};

export default NoResults;
