import Head from 'next/head';

import styles from './real-time-search.module.scss';

import NavBar from '../../../../components/labs/real-time-search/Navigation/NavigationBar';
import SearchFormContainer from '../../../../components/labs/real-time-search/Navigation/SearchFormContainer/SearchFormContainer';
import SearchForm from '../../../../components/labs/real-time-search/Navigation/SearchFormContainer/SearchForm/SearchForm';
import SearchResultsContainer from '../../../../components/labs/real-time-search/Navigation/SearchFormContainer/SearchResultsContainer/SearchResultContainer';

import TonguesContainer from '../../../../components/common/tongues-container/tonguesContainer';

const RealTimeSearch: React.FC = () => {
  return (
    <>
      <Head>
        <title>Portfolio JM2: Labs - Real Time Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar>
        <SearchFormContainer>
          <SearchForm />
          <SearchResultsContainer />
        </SearchFormContainer>
      </NavBar>
      <TonguesContainer CheckCodePath="https://github.com/Joaquin-M2/portfolio-website/blob/master/pages/portfolio/labs/real-time-search/index.tsx" />
    </>
  );
};

export default RealTimeSearch;
