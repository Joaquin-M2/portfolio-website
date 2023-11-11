"use client";

import { useEffect, useRef, useState } from "react";

import ToolCard from "../../components/ToolCard/ToolCard";
import FiltersBar2 from "../../components/FiltersBar2/FiltersBar2";

import styles from "./tools.module.scss";
import { createRequest } from "../../utils/requests";
import MenuCard from "../../components/MenuCard/MenuCard";
import LoginAndSignupForms from "./LoginAndSignupForms";
import AddToolForm from "./AddToolForm";
import AddTagForm from "./AddTagForm";

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
    addToolModalIsShown: false,
    addTagModalIsShown: false,
    modifyTagModalIsShown: false,
    deleteTagModalIsShown: false,
    modifyUserModalIsShown: false,
    deleteUserModalIsShown: false,
  });
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [tagsMenuCardIsVisible, setTagsMenuCardIsVisible] = useState(false);
  const [usersMenuCardIsVisible, setUsersMenuCardIsVisible] = useState(false);
  const [updatedTools, setUpdatedTools] = useState([]);
  const [updatedTags, setUpdatedTags] = useState([]);
  // ADD TOOL FORM
  const [tagsAddToolForm, setTagsAddToolForm] = useState([]);
  const [selectedTagsAddToolForm, setSelectedTagsAddToolForm] = useState([]);

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
            [`updateToolModalIsShown${_id}`]: false,
            [`deleteToolModalIsShown${_id}`]: false,
          }));
        });
      })
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, [updatedTools, updatedTags]);

  useEffect(() => {
    fetch(createRequest({ urlPath: "/tags" }))
      .then((response) => response.json())
      .then((data) => {
        setTags(data.tags);
        setTagsAddToolForm(data.tags);
      })
      .catch((error) => console.log(error));
  }, [updatedTags]);

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
        .map(({ _id, iconUrl, title, description, tags: toolTags, url }) => {
          return (
            <ToolCard
              deleteToolModalIsShown={
                modalsState[`deleteToolModalIsShown${_id}`]
              }
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
              selectedTagsAddToolForm={selectedTagsAddToolForm}
              updateToolModalIsShown={
                modalsState[`updateToolModalIsShown${_id}`]
              }
              hideUpdateToolModal={() =>
                setModalsState((prevValue) => ({
                  ...prevValue,
                  [`updateToolModalIsShown${_id}`]: false,
                }))
              }
              setUpdateToolModalIsShown={() => {
                setModalsState((prevValue) => ({
                  ...prevValue,
                  [`updateToolModalIsShown${_id}`]: true,
                }));

                setSelectedTagsAddToolForm(() => toolTags);
              }}
              handleAddTag={(event) => {
                setSelectedTagsAddToolForm((prevValue) => [
                  ...prevValue,
                  { name: event.target.textContent, _id: event.target.value },
                ]);
              }}
              handleRemoveTag={(event) => {
                setSelectedTagsAddToolForm((prevValue) =>
                  prevValue.filter(
                    (tag) => tag.name !== event.target.textContent
                  )
                );
              }}
              setToolsFrontend={setUpdatedTools}
              id={_id.toString()}
              key={_id}
              logo={iconUrl}
              allTags={tags}
              toolTags={toolTags}
              title={title}
              description={description}
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
              className={styles.managementButton}
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
              className={styles.managementButton}
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
              className={styles.managementButton}
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

  /////////////////////////////
  // ADMIN MANAGEMENT BUTTONS

  const renderAdminManagementButtons: () =>
    | JSX.Element
    | JSX.Element[] = () => {
    return (
      <>
        <button
          className={styles.managementButton}
          onClick={() => {
            setModalsState((prevValue) => ({
              ...prevValue,
              addToolModalIsShown: true,
            }));
          }}
        >
          Add Tool
        </button>
        <div className={styles.menuButtonContainer}>
          <button
            className={styles.managementButton}
            onClick={() => {
              setTagsMenuCardIsVisible((prevValue) => !prevValue);
            }}
          >
            Tags
          </button>
          <MenuCard isVisible={tagsMenuCardIsVisible} position="bottom-left">
            <li
              onClick={() => {
                setModalsState((prevValue) => ({
                  ...prevValue,
                  addTagModalIsShown: true,
                }));
              }}
            >
              Add tag
            </li>
            <li
              onClick={() => {
                setModalsState((prevValue) => ({
                  ...prevValue,
                  modifyTagModalIsShown: true,
                }));
              }}
            >
              Modify tag
            </li>
            <li
              onClick={() => {
                setModalsState((prevValue) => ({
                  ...prevValue,
                  deleteTagModalIsShown: true,
                }));
              }}
            >
              Delete tag
            </li>
          </MenuCard>
        </div>
        <div className={styles.menuButtonContainer}>
          <button
            className={styles.managementButton}
            onClick={() => {
              setUsersMenuCardIsVisible((prevValue) => !prevValue);
            }}
          >
            Users
          </button>
          <MenuCard isVisible={usersMenuCardIsVisible} position="bottom-left">
            <li
              onClick={() => {
                setModalsState((prevValue) => ({
                  ...prevValue,
                  modifyUserModalIsShown: true,
                }));
              }}
            >
              Modify user
            </li>
            <li
              onClick={() => {
                setModalsState((prevValue) => ({
                  ...prevValue,
                  deleteUserModalIsShown: true,
                }));
              }}
            >
              Delete user
            </li>
          </MenuCard>
        </div>
      </>
    );
  };

  useEffect(() => {
    if (!modalsState.addToolModalIsShown) setSelectedTagsAddToolForm([]);
  }, [modalsState.addToolModalIsShown]);

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
        <div className={styles.adminManagementButtons}>
          {renderAdminManagementButtons()}
        </div>
        <div className={styles.userManagementButtons}>
          {renderUserManagementButtons()}
        </div>
      </div>

      <AddToolForm
        formIsOpen={modalsState.addToolModalIsShown}
        hideModal={() =>
          setModalsState((prevValue) => ({
            ...prevValue,
            addToolModalIsShown: false,
          }))
        }
        requestMethod="POST"
        requestUrlPath="/tools"
        resetFormValues={!modalsState.addToolModalIsShown}
        tags={tagsAddToolForm}
        selectedTagsAddToolForm={selectedTagsAddToolForm}
        setToolsFrontend={setUpdatedTools}
        handleAddTag={(event) => {
          setSelectedTagsAddToolForm((prevValue) => [
            ...prevValue,
            { name: event.target.textContent, _id: event.target.value },
          ]);
        }}
        handleRemoveTag={(event) => {
          setSelectedTagsAddToolForm((prevValue) =>
            prevValue.filter((tag) => tag.name !== event.target.textContent)
          );
        }}
      />
      <AddTagForm
        formIsOpen={modalsState.addTagModalIsShown}
        hideModal={() =>
          setModalsState((prevValue) => ({
            ...prevValue,
            addTagModalIsShown: false,
          }))
        }
        resetFormValues={!modalsState.addTagModalIsShown}
        setToolsFrontend={setUpdatedTags}
        tags={tags}
      />
      <LoginAndSignupForms
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
      <LoginAndSignupForms
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
