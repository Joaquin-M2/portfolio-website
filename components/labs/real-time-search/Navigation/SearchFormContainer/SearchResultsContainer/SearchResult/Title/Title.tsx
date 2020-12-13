import styles from './Title.module.scss';

const SearchResultTitle = props => {
  return (
    <div className={styles.titleContainer}>
      <h4 className={styles.title}>{props.children}</h4>
    </div>
  );
};

export default SearchResultTitle;
