import styles from './SearcFormContainer.module.scss';

const SearchFormContainer = props => {
  return <div className={styles.container}>{props.children}</div>;
};

export default SearchFormContainer;
