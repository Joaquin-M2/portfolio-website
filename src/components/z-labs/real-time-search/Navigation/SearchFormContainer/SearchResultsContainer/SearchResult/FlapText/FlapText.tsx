import styles from './FlapText.module.scss';

const SearchResult = props => {
  return <p className={styles.text}>{props.children}</p>;
};

export default SearchResult;
