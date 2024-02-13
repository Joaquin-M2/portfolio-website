import NavBar from "@/components/z-labs/real-time-search/Navigation/NavigationBar";
import SearchFormContainer from "@/components/z-labs/real-time-search/Navigation/SearchFormContainer/SearchFormContainer";
import SearchForm from "@/components/z-labs/real-time-search/Navigation/SearchFormContainer/SearchForm/SearchForm";
import SearchResultsContainer from "@/components/z-labs/real-time-search/Navigation/SearchFormContainer/SearchResultsContainer/SearchResultContainer";

import TonguesContainer from "@/components/TonguesContainer/TonguesContainer";

import labsData from "@/data/labs";

import styles from "./real-time-search.module.scss";

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
        <TonguesContainer
          CheckCodePath={
            labsData.find((project) => project.title === "Real Time Search")
              .linkToCode
          }
        />
      </div>
    </>
  );
};

export default Page;
