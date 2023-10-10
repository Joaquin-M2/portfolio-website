import NavBar from '../../../../components/z-labs/real-time-search/Navigation/NavigationBar';
import SearchFormContainer from '../../../../components/z-labs/real-time-search/Navigation/SearchFormContainer/SearchFormContainer';
import SearchForm from '../../../../components/z-labs/real-time-search/Navigation/SearchFormContainer/SearchForm/SearchForm';
import SearchResultsContainer from '../../../../components/z-labs/real-time-search/Navigation/SearchFormContainer/SearchResultsContainer/SearchResultContainer';

import TonguesContainer from '../../../../components/TonguesContainer/TonguesContainer';

import styles from './real-time-search.module.scss';

const Page: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <NavBar>
          <SearchFormContainer>
            <SearchForm />
            <SearchResultsContainer />
          </SearchFormContainer>
        </NavBar>
        <TonguesContainer CheckCodePath='https://github.com/Joaquin-M2/portfolio-website/blob/master/pages/portfolio/labs/real-time-search/index.tsx' />
      </div>
    </>
  );
};

export default Page;
