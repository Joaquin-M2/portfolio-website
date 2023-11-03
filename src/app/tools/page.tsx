"use client";

import { useEffect, useRef, useState } from "react";

import ToolCard from "../../components/ToolCard/ToolCard";
import FiltersBar2 from "../../components/FiltersBar2/FiltersBar2";
import FormInModal from "./FormInModal";

import styles from "./tools.module.scss";
import { createRequest } from "../../utils/requests";

interface Tool {
  _id: string;
  title: string;
  description: string;
  tags: [
    {
      _id: string;
      name: string;
    }
  ];
  iconUrl: string;
  url: string;
}

function Page() {
  const [toolsInLocalStorage, setToolsInLocalStorage] = useState([]);
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>();
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [selectedFilterTags, setSelectedFilterTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const previousFilterTagsQuantity = useRef(selectedFilterTags.length);
  const searchFieldTools = useRef([]);
  const [modalsState, setModalsState] = useState({
    logInModalIsShown: false,
    signUpModalIsShown: false,
  });
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  /////////////////////////////
  // REQUESTS ON PAGE LOAD

  useEffect(() => {
    fetch(createRequest({ urlPath: "/tools" }))
      .then((response) => response.json())
      .then((data) => {
        setTools(data.tools);
        setFilteredTools(data.tools);
      })
      .then(() => {
        tools.map(({ _id }) => {
          setModalsState((prevValue) => ({
            ...prevValue,
            [`deleteToolModalIsShown${_id}`]: false,
          }));
        });
      })
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(createRequest({ urlPath: "/tags" }))
      .then((response) => response.json())
      .then((data) => setTags(data.tags))
      .catch((error) => console.log(error));
  }, []);

  /////////////////////////////
  // SEARCH INPUT FILTER

  const filterBySearch = (event) => {
    if (event.target.value.length > searchFieldValue.length) {
      setFilteredTools((prevValue) =>
        prevValue.filter((tool) => {
          return tool.title.includes(event.target.value);
        })
      );
    } else {
      if (selectedFilterTags.length) {
        setFilteredTools((prevValue) =>
          prevValue.filter((tool) => {
            return selectedFilterTags.every((filterTag) =>
              tool.tags.some((tag) => tag.name === filterTag)
            );
          })
        );
        setFilteredTools((prevValue) =>
          prevValue.filter((tool) => {
            return tool.title.includes(event.target.value);
          })
        );
      } else {
        setFilteredTools(
          tools.filter((tool) => {
            return tool.title.includes(event.target.value);
          })
        );
      }
    }
    setSearchFieldValue(event.target.value);
    searchFieldTools.current = tools.filter((tool) => {
      return tool.title.includes(searchFieldValue);
    });
  };

  /////////////////////////////
  // TAG INPUT FILTER

  const filterByTag = (event) => {
    setSelectedFilterTags((prevValue) => [...prevValue, event.target.value]);
  };
  const handleRemoveFilterTag = (event) => {
    setSelectedFilterTags((prevValue) =>
      prevValue.filter((tag) => tag !== event.target.textContent)
    );
  };
  useEffect(() => {
    // Required in order to have "selectedFilterTags" updated before executing "setFilteredTools".
    searchFieldTools.current = tools.filter((tool) => {
      return tool.title.includes(searchFieldValue);
    });

    if (selectedFilterTags.length > previousFilterTagsQuantity.current) {
      setFilteredTools((prevValue) =>
        prevValue.filter((tool) => {
          return selectedFilterTags.every((filterTag) =>
            tool.tags.some((tag) => tag.name === filterTag)
          );
        })
      );
    } else if (selectedFilterTags.length < previousFilterTagsQuantity.current) {
      setFilteredTools(
        searchFieldTools.current.filter((tool) => {
          return selectedFilterTags.every((filterTag) =>
            tool.tags.some((tag) => tag.name === filterTag)
          );
        })
      );
    }

    previousFilterTagsQuantity.current = selectedFilterTags.length;
  }, [selectedFilterTags]);

  /////////////////////////////
  // TOOL CARDS

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("favoritedToolsId"))
    ) {
      setToolsInLocalStorage(
        JSON.parse(localStorage.getItem("favoritedToolsId"))
      );
    } else {
      setToolsInLocalStorage([]);
    }
  }, []);

  const renderToolCards: () => JSX.Element | JSX.Element[] = () => {
    if (isLoading) {
      return <h1 className={styles.noToolsTitle}>Loading...</h1>;
    } else if (!isLoading && filteredTools.length) {
      return filteredTools
        .sort(
          (a, b) =>
            toolsInLocalStorage.indexOf(b._id.toString()) -
            toolsInLocalStorage.indexOf(a._id.toString())
        )
        .map(({ _id, iconUrl, title, description, tags, url }) => {
          return (
            <ToolCard
              deleteToolModalIsShown={
                modalsState[`deleteToolModalIsShown${_id}`]
              }
              description={description}
              hideDeleteToolModal={() =>
                setModalsState((prevValue) => ({
                  ...prevValue,
                  [`deleteToolModalIsShown${_id}`]: false,
                }))
              }
              setDeleteToolModalIsShown={() => {
                setModalsState((prevValue) => ({
                  ...prevValue,
                  [`deleteToolModalIsShown${_id}`]: true,
                }));
              }}
              id={_id.toString()}
              key={_id}
              logo={iconUrl}
              tags={tags}
              title={title}
              toolsInLocalStorage={toolsInLocalStorage}
              url={url}
            />
          );
        });
    } else {
      return <h1 className={styles.noToolsTitle}>No tools found.</h1>;
    }
  };

  /////////////////////////////
  // USER MANAGEMENT BUTTONS

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserIsLoggedIn(true);
    } else {
      setUserIsLoggedIn(false);
    }
  }, [modalsState.logInModalIsShown]);

  const renderUserManagementButtons: () => JSX.Element | JSX.Element[] = () => {
    return (
      <>
        {userIsLoggedIn ? (
          <>
            <button
              className={styles.logInButton}
              onClick={() => {
                localStorage.removeItem("userToken");
                setUserIsLoggedIn(false);
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.logInButton}
              onClick={() => {
                setModalsState((prevValue) => ({
                  ...prevValue,
                  logInModalIsShown: true,
                }));
              }}
            >
              Log In
            </button>
            <button
              className={styles.signUpButton}
              onClick={() => {
                setModalsState((prevValue) => ({
                  ...prevValue,
                  signUpModalIsShown: true,
                }));
              }}
            >
              Sign Up
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <FiltersBar2
        filterBySearchFunction={filterBySearch}
        filterByTagFunction={filterByTag}
        selectedFilterTags={selectedFilterTags}
        handleRemoveFilterTag={handleRemoveFilterTag}
        tags={tags}
      />
      <div className={styles.buttonsContainer}>
        {renderUserManagementButtons()}
      </div>

      <FormInModal
        formIsOpen={modalsState.logInModalIsShown}
        formType="login"
        hideModal={() =>
          setModalsState((prevValue) => ({
            ...prevValue,
            logInModalIsShown: false,
          }))
        }
        requestMethod="POST"
        requestUrlPath="/user/login"
        resetFormValues={!modalsState.logInModalIsShown}
      />
      <FormInModal
        formIsOpen={modalsState.signUpModalIsShown}
        formType="signup"
        hideModal={() =>
          setModalsState((prevValue) => ({
            ...prevValue,
            signUpModalIsShown: false,
          }))
        }
        requestMethod="POST"
        requestUrlPath="/user/signup"
        resetFormValues={!modalsState.signUpModalIsShown}
      />
      <main className={styles.mainContainer}>{renderToolCards()}</main>
    </>
  );
}
export default Page;
