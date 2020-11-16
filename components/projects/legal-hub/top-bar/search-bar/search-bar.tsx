import styles from './search-bar.module.scss';

import MagnifyingGlassIcon from '../../../../SVG-icons/portfolio/projects/LegalHub/magnifying-glass';

const SearchBar: React.FC = () => {
  return (
    <form action="#" className={styles.searchForm}>
      <input
        type="text"
        className={styles.searchForm_input}
        placeholder="Search legal professionals"
      />
      <button className={styles.searchForm_button}>
        <MagnifyingGlassIcon additionalStyles={styles.searchForm_icon} />
      </button>
    </form>
  );
};

export default SearchBar;
