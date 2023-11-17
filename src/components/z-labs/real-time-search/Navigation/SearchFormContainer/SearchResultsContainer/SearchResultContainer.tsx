"use client";

import { useEffect, useState } from "react";

import { useStore } from "../../../../../../../hooks-store/store";

import styles from "./SearchResultContainer.module.scss";

import sendHttpRequest from "../../../../../../utils/sendHttpRequest-XML";
import decodeHTMLEntities from "../../../../../../utils/decodeHTMLEntities";

import SearchResult from "./SearchResult/SearchResult";
import Spinner from "./Spinner/Spinner";
import NoResults from "./NoResults/NoResults";

// const StyledSearchResultsContainer = styled.div`
//   display: ${props => (props.userInput === '' ? 'none' : 'block')};

// `;

const SearchResultsContainer = (props) => {
  const [results, setResults] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const state = useStore()[0];

  useEffect(() => {
    let foundResults = [];
    function fetchBooks() {
      if (!state.userInput || spinner) return;
      setSpinner(true);
      sendHttpRequest(
        "GET",
        `https://reststop.randomhouse.com/resources/titles?search=${encodeURI(
          state.userInput
        )}`
      )
        .then((response) => {
          if (response.children[0].children.length > 0) {
            let currIteration = 0;
            for (const foundResult of response.children[0].children) {
              currIteration++;
              const titleText =
                foundResult.querySelector("titleweb").textContent;
              const authorText =
                foundResult.querySelector("authorweb").textContent;
              const flapElement = foundResult.querySelector("flapcopy");
              const flapDecoded = decodeHTMLEntities(
                flapElement
                  ? flapElement.textContent
                  : "Description not available."
              );
              foundResults.push(
                <SearchResult
                  img={foundResult.attributes[0].nodeValue}
                  title={titleText}
                  flap={
                    flapDecoded.length >= 220
                      ? flapDecoded
                          .replace(/(<\/?(\s|\S)*?>)/g, " ")
                          .substring(0, 220)
                          .trim() + "..."
                      : flapDecoded.replace(/(<\/?(\s|\S)*?>)/g, " ").trim()
                  }
                  author={authorText}
                  key={currIteration}
                />
              );
            }
            return foundResults;
          } else {
            foundResults = [<NoResults key={1} />];
            return foundResults;
          }
        })
        .then((results) => {
          setResults(results);
          setSpinner(false);
        });
    }

    fetchBooks();
  }, [state.userInput]);

  return (
    <div
      className={`${styles.container} ${
        state.userInput === "" ? null : styles.displayContainer
      }`}
    >
      {spinner ? <Spinner /> : results}
    </div>
  );
};

export default SearchResultsContainer;
