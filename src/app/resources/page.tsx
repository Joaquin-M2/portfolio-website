"use client";

import { useEffect, useRef, useState } from "react";

import FiltersBar2 from "@/components/FiltersBar2/FiltersBar2";
import MenuCard from "@/components/MenuCard/MenuCard";
import Modal from "@/components/Modal/Modal";
import ResourceCard from "@/components/ResourceCard/ResourceCard";

import { createRequest } from "@/utils/requests";
import checkJwtTokenHasExpired from "@/utils/check-user-token-expiration";
import getUserTokenData from "@/utils/get-user-token-data";

import AddIconForm from "./AddIconForm/AddIconForm";
import AddTagForm from "./AddTagForm/AddTagForm";
import AddResourceForm from "./AddResourceForm/AddResourceForm";
import DeleteIconForm from "./DeleteIconForm/DeleteIconForm";
import DeleteTagForm from "./DeleteTagForm/DeleteTagForm";
import DeleteUserForm from "./DeleteUserForm/DeleteUserForm";
import LoginAndSignupForms from "./LoginAndSignupForms/LoginAndSignupForms";
import UpdateIconForm from "./UpdateIconForm/UpdateIconForm";
import UpdateTagForm from "./UpdateTagForm/UpdateTagForm";
import UpdateUserForm from "./UpdateUserForm/UpdateUserForm";

import styles from "./resources.module.scss";
import Button from "@/components/Button/Button";
import NavBar from "@/components/NavBar/NavBar";

/**
 * ---------------- WARNING: ----------------
 *
 * "tool" was the original name of the "resources" page. Therefore,
 * on this page the word "Tool(s)" equals to "Resource(s)".
 *
 */
interface Resource {
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
  const [userAllFavoriteTools, setUserAllFavoriteTools] = useState([]);
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState<Resource[]>([]);
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [searchType, setSearchType] = useState("");
  const [selectedFilterTags, setSelectedFilterTags] = useState([]);
  const [selectedExcludingFilterTags, setSelectedExcludingFilterTags] =
    useState([]);
  const allSelectedTagsQuantity =
    selectedFilterTags.length + selectedExcludingFilterTags.length;
  const [tags, setTags] = useState([]);
  const [icons, setIcons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const previousFilterTagsQuantity = useRef(selectedFilterTags.length);
  const searchField = useRef<HTMLInputElement>();
  const searchFieldTools = useRef([]);
  const [modalsState, setModalsState] = useState({
    expiredTokenModalIsShown: false,
    logInModalIsShown: false,
    signUpModalIsShown: false,
    addToolModalIsShown: false,
    addIconModalIsShown: false,
    updateIconModalIsShown: false,
    deleteIconModalIsShown: false,
    addTagModalIsShown: false,
    updateTagModalIsShown: false,
    deleteTagModalIsShown: false,
    updateUserModalIsShown: false,
    deleteUserModalIsShown: false,
  });
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [iconsMenuCardIsVisible, setIconsMenuCardIsVisible] = useState(false);
  const [tagsMenuCardIsVisible, setTagsMenuCardIsVisible] = useState(false);
  const [usersMenuCardIsVisible, setUsersMenuCardIsVisible] = useState(false);
  const [updatedTools, setUpdatedTools] = useState([]);
  const [updatedTags, setUpdatedTags] = useState([]);
  const [updatedIcons, setUpdatedIcons] = useState([]);
  // ADD TOOL FORM
  const [tagsAddToolForm, setTagsAddToolForm] = useState([]);
  const [selectedTagsAddToolForm, setSelectedTagsAddToolForm] = useState([]);

  /////////////////////////////
  // REQUESTS ON PAGE LOAD

  useEffect(() => {
    fetch(createRequest({ urlPath: "/resources" }))
      .then((response) => response.json())
      .then((data) => {
        setTools(data.resources);
        setFilteredTools(data.resources);
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
  }, [updatedTools, updatedTags, updatedIcons]);

  useEffect(() => {
    fetch(createRequest({ urlPath: "/tags" }))
      .then((response) => response.json())
      .then((data) => {
        setTags(data.tags);
        setTagsAddToolForm(data.tags);
      })
      .catch((error) => console.log(error));
  }, [updatedTags]);

  useEffect(() => {
    fetch(createRequest({ urlPath: "/icons" }))
      .then((response) => response.json())
      .then((data) => {
        setIcons(data.icons);
        //setTagsAddToolForm(data.tags);
      })
      .catch((error) => console.log(error));
  }, [updatedIcons]);

  useEffect(() => {
    setUserIsAdmin(getUserTokenData("role") === "admin");
  }, [modalsState.logInModalIsShown]);

  /////////////////////////////
  // SEARCH INPUT FILTER

  const pullSearchType = (searchType) => {
    // This function is pulling the search type (by-title | by-description) from <FiltersBar2>.
    setSearchType(searchType);
  };

  const filterBySearchType = (keepFilteredTools = true) => {
    if (keepFilteredTools) {
      filterFilteredToolsBySearchType();
    } else {
      filterAllToolsBySearchType();
    }
  };

  const filterFilteredToolsBySearchType = () => {
    if (searchType === "by-title") {
      setFilteredTools((prevValue) =>
        prevValue.filter((tool) => {
          return tool.title.includes(searchField.current.value);
        })
      );
    } else {
      setFilteredTools((prevValue) =>
        prevValue.filter((tool) => {
          return tool.description.includes(searchField.current.value);
        })
      );
    }
  };

  const filterAllToolsBySearchType = () => {
    if (searchType === "by-title") {
      setFilteredTools(
        tools.filter((tool) => {
          return tool.title.includes(searchField.current.value);
        })
      );
    } else {
      setFilteredTools(
        tools.filter((tool) => {
          return tool.description.includes(searchField.current.value);
        })
      );
    }
  };

  const setSearchFieldTools = () => {
    if (searchType === "by-title") {
      searchFieldTools.current = tools.filter((tool) => {
        return tool.title.includes(searchFieldValue);
      });
    } else {
      searchFieldTools.current = tools.filter((tool) => {
        return tool.description.includes(searchFieldValue);
      });
    }
  };

  const filterBySearch = () => {
    if (searchField.current.value.length > searchFieldValue.length) {
      filterBySearchType();
    } else {
      filterConsideringTags();
    }
    setSearchFieldValue(searchField.current.value);
    setSearchFieldTools();
  };

  const filterConsideringTags = () => {
    if (allSelectedTagsQuantity) {
      setFilteredTools(
        tools
          .filter((tool) => {
            return selectedFilterTags.every((filterTag) =>
              tool.tags.some((tag) => tag.name === filterTag)
            );
          })
          .filter((tool) => {
            return selectedExcludingFilterTags.every((excludingFilterTag) =>
              tool.tags.every((tag) => tag.name !== excludingFilterTag)
            );
          })
      );
      filterBySearchType();
    } else {
      filterBySearchType(false);
    }
  };

  useEffect(() => {
    setFilteredTools(tools);
    filterBySearch();
  }, [searchType]);

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

  const filterByExcludingTag = (event) => {
    setSelectedExcludingFilterTags((prevValue) => [
      ...prevValue,
      event.target.value,
    ]);
  };
  const handleRemoveExcludingFilterTag = (event) => {
    setSelectedExcludingFilterTags((prevValue) =>
      prevValue.filter((tag) => tag !== event.target.textContent)
    );
  };
  useEffect(() => {
    setSearchFieldTools(); // Required in order to have "selectedFilterTags" updated before executing "setFilteredTools".

    if (allSelectedTagsQuantity > previousFilterTagsQuantity.current) {
      setFilteredTools((prevValue) =>
        prevValue
          .filter((tool) => {
            return selectedFilterTags.every((filterTag) =>
              tool.tags.some((tag) => tag.name === filterTag)
            );
          })
          .filter((tool) => {
            return selectedExcludingFilterTags.every((excludingFilterTag) =>
              tool.tags.every((tag) => tag.name !== excludingFilterTag)
            );
          })
      );
    } else if (allSelectedTagsQuantity < previousFilterTagsQuantity.current) {
      setFilteredTools(
        searchFieldTools.current
          .filter((tool) => {
            return selectedFilterTags.every((filterTag) =>
              tool.tags.some((tag) => tag.name === filterTag)
            );
          })
          .filter((tool) => {
            return selectedExcludingFilterTags.every((excludingFilterTag) =>
              tool.tags.every((tag) => tag.name !== excludingFilterTag)
            );
          })
      );
    }

    previousFilterTagsQuantity.current = allSelectedTagsQuantity;
  }, [selectedFilterTags, selectedExcludingFilterTags]);

  /////////////////////////////
  // RESOURCE CARDS

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (JSON.parse(localStorage.getItem("accountFavoriteResourcesId"))) {
        setUserAllFavoriteTools((prevValue) => {
          const allValues = [
            ...JSON.parse(localStorage.getItem("accountFavoriteResourcesId")),
            ...prevValue,
          ];
          return [...new Set(allValues)];
        });
      }
    }
  }, [userIsLoggedIn]);

  const renderResourceCards: () => JSX.Element | JSX.Element[] = () => {
    if (isLoading) {
      return <h1 className={styles.noToolsTitle}>Loading...</h1>;
    } else if (!isLoading && filteredTools.length) {
      return filteredTools
        .sort(
          (a, b) =>
            userAllFavoriteTools.indexOf(b._id.toString()) -
            userAllFavoriteTools.indexOf(a._id.toString())
        )
        .map(({ _id, iconUrl, title, description, tags: toolTags, url }) => {
          return (
            <ResourceCard
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
                checkTokenHasExpired(`deleteToolModalIsShown${_id}`);
              }}
              selectedTagsAddToolForm={selectedTagsAddToolForm}
              updateToolModalIsShown={
                modalsState[`updateToolModalIsShown${_id}`]
              }
              hideUpdateToolModal={() => {
                setModalsState((prevValue) => ({
                  ...prevValue,
                  [`updateToolModalIsShown${_id}`]: false,
                }));
                setTimeout(() => setSelectedTagsAddToolForm([]), 500);
              }}
              setUpdateToolModalIsShown={() => {
                checkTokenHasExpired(`updateToolModalIsShown${_id}`);

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
              allIcons={icons}
              allTags={tags}
              toolTags={toolTags}
              title={title}
              description={description}
              userAllFavoriteTools={userAllFavoriteTools}
              url={url}
            />
          );
        });
    } else {
      return <h1 className={styles.noToolsTitle}>No resources found.</h1>;
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

  const logoutUser = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("accountFavoriteResourcesId");
    setUserAllFavoriteTools([]);
    setUserIsLoggedIn(false);
  };

  const renderUserManagementButtons: () => JSX.Element | JSX.Element[] = () => {
    return (
      <>
        {userIsLoggedIn ? (
          <>
            <NavBar top narrow leftSided>
              <Button
                small
                onClick={() => {
                  logoutUser();
                  setUserIsAdmin(false);
                }}
              >
                Log Out
              </Button>
            </NavBar>
          </>
        ) : (
          <>
            <NavBar top narrow leftSided>
              <Button
                small
                onClick={() => {
                  setModalsState((prevValue) => ({
                    ...prevValue,
                    logInModalIsShown: true,
                  }));
                }}
                isActive={modalsState.logInModalIsShown}
              >
                Log In
              </Button>
              <Button
                small
                onClick={() => {
                  setModalsState((prevValue) => ({
                    ...prevValue,
                    signUpModalIsShown: true,
                  }));
                }}
                isActive={modalsState.signUpModalIsShown}
              >
                Sign Up
              </Button>
            </NavBar>
          </>
        )}
      </>
    );
  };

  /////////////////////////////
  // ADMIN MANAGEMENT BUTTONS

  const checkTokenHasExpired = (affectedModal) => {
    if (typeof window !== "undefined") {
      if (checkJwtTokenHasExpired() === true) {
        setModalsState((prevValue) => ({
          ...prevValue,
          expiredTokenModalIsShown: true,
        }));
        logoutUser();
        return false;
      } else {
        setModalsState((prevValue) => ({
          ...prevValue,
          [`${affectedModal}`]: true,
        }));
        return true;
      }
    }
  };

  const renderAdminManagementButtons: () =>
    | JSX.Element
    | JSX.Element[] = () => {
    return (
      <>
        <NavBar top narrow rightSided>
          <Button
            small
            onClick={() => {
              checkTokenHasExpired("addToolModalIsShown");
              setIconsMenuCardIsVisible(false);
              setTagsMenuCardIsVisible(false);
              setUsersMenuCardIsVisible(false);
            }}
            isActive={modalsState.addToolModalIsShown}
          >
            Add Resource
          </Button>
          <div className={styles.menuButtonContainer}>
            <Button
              small
              onClick={() => {
                setIconsMenuCardIsVisible((prevValue) => !prevValue);
                setTagsMenuCardIsVisible(false);
                setUsersMenuCardIsVisible(false);
              }}
              isActive={iconsMenuCardIsVisible}
            >
              Icons
            </Button>
            <MenuCard isVisible={iconsMenuCardIsVisible} position="bottom-left">
              <li
                onClick={() => {
                  checkTokenHasExpired("addIconModalIsShown");
                }}
              >
                Add icon
              </li>
              <li
                onClick={() => {
                  checkTokenHasExpired("updateIconModalIsShown");
                }}
              >
                Update icon
              </li>
              <li
                onClick={() => {
                  checkTokenHasExpired("deleteIconModalIsShown");
                }}
              >
                Delete icon
              </li>
            </MenuCard>
          </div>
          <div className={styles.menuButtonContainer}>
            <Button
              small
              onClick={() => {
                setIconsMenuCardIsVisible(false);
                setTagsMenuCardIsVisible((prevValue) => !prevValue);
                setUsersMenuCardIsVisible(false);
              }}
              isActive={tagsMenuCardIsVisible}
            >
              Tags
            </Button>
            <MenuCard isVisible={tagsMenuCardIsVisible} position="bottom-left">
              <li
                onClick={() => {
                  checkTokenHasExpired("addTagModalIsShown");
                }}
              >
                Add tag
              </li>
              <li
                onClick={() => {
                  checkTokenHasExpired("updateTagModalIsShown");
                }}
              >
                Update tag
              </li>
              <li
                onClick={() => {
                  checkTokenHasExpired("deleteTagModalIsShown");
                }}
              >
                Delete tag
              </li>
            </MenuCard>
          </div>
          <div className={styles.menuButtonContainer}>
            <Button
              small
              onClick={() => {
                setIconsMenuCardIsVisible(false);
                setTagsMenuCardIsVisible(false);
                setUsersMenuCardIsVisible((prevValue) => !prevValue);
              }}
              isActive={usersMenuCardIsVisible}
            >
              Users
            </Button>
            <MenuCard isVisible={usersMenuCardIsVisible} position="bottom-left">
              <li
                onClick={() => {
                  checkTokenHasExpired("updateUserModalIsShown");
                }}
              >
                Update user
              </li>
              <li
                onClick={() => {
                  checkTokenHasExpired("deleteUserModalIsShown");
                }}
              >
                Delete user
              </li>
            </MenuCard>
          </div>
        </NavBar>
      </>
    );
  };

  useEffect(() => {
    if (!modalsState.addToolModalIsShown) setSelectedTagsAddToolForm([]);
  }, [modalsState.addToolModalIsShown]);

  /////////////////////////////
  // RESET FILTERS AFTER MODIFYING TOOLS LIST

  useEffect(() => {
    setSelectedFilterTags([]);
    setSelectedExcludingFilterTags([]);
    searchField.current.value = "";
  }, [updatedTools]);

  return (
    <>
      <FiltersBar2
        filterBySearchFunction={filterBySearch}
        filterByTagFunction={filterByTag}
        filterByExcludingTagFunction={filterByExcludingTag}
        selectedFilterTags={selectedFilterTags}
        selectedExcludingFilterTags={selectedExcludingFilterTags}
        handleRemoveFilterTag={handleRemoveFilterTag}
        handleRemoveExcludingFilterTag={handleRemoveExcludingFilterTag}
        pushSearchType={pullSearchType}
        tags={tags}
        toolsQuantity={filteredTools.length}
        ref={searchField}
      />
      {userIsAdmin && userIsLoggedIn && renderAdminManagementButtons()}
      {renderUserManagementButtons()}

      <AddResourceForm
        formIsOpen={modalsState.addToolModalIsShown}
        hideModal={() =>
          setModalsState((prevValue) => ({
            ...prevValue,
            addToolModalIsShown: false,
          }))
        }
        requestMethod="POST"
        requestUrlPath="/resources"
        resetFormValues={!modalsState.addToolModalIsShown}
        tags={tagsAddToolForm}
        icons={icons}
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
      <AddIconForm
        formIsOpen={modalsState.addIconModalIsShown}
        hideModal={() =>
          setModalsState((prevValue) => ({
            ...prevValue,
            addIconModalIsShown: false,
          }))
        }
        resetFormValues={!modalsState.addIconModalIsShown}
        setToolsFrontend={setUpdatedIcons}
        icons={icons}
      />
      <UpdateIconForm
        formIsOpen={modalsState.updateIconModalIsShown}
        hideModal={() =>
          setModalsState((prevValue) => ({
            ...prevValue,
            updateIconModalIsShown: false,
          }))
        }
        resetFormValues={!modalsState.updateIconModalIsShown}
        setToolsFrontend={setUpdatedIcons}
        icons={icons}
      />
      <DeleteIconForm
        formIsOpen={modalsState.deleteIconModalIsShown}
        hideModal={() =>
          setModalsState((prevValue) => ({
            ...prevValue,
            deleteIconModalIsShown: false,
          }))
        }
        resetFormValues={!modalsState.deleteIconModalIsShown}
        setToolsFrontend={setUpdatedIcons}
        icons={icons}
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
      <UpdateTagForm
        formIsOpen={modalsState.updateTagModalIsShown}
        hideModal={() =>
          setModalsState((prevValue) => ({
            ...prevValue,
            updateTagModalIsShown: false,
          }))
        }
        resetFormValues={!modalsState.updateTagModalIsShown}
        setToolsFrontend={setUpdatedTags}
        tags={tags}
      />
      <DeleteTagForm
        formIsOpen={modalsState.deleteTagModalIsShown}
        hideModal={() =>
          setModalsState((prevValue) => ({
            ...prevValue,
            deleteTagModalIsShown: false,
          }))
        }
        resetFormValues={!modalsState.deleteTagModalIsShown}
        setToolsFrontend={setUpdatedTags}
        tags={tags}
      />
      <UpdateUserForm
        formIsOpen={modalsState.updateUserModalIsShown}
        hideModal={() =>
          setModalsState((prevValue) => ({
            ...prevValue,
            updateUserModalIsShown: false,
          }))
        }
        resetFormValues={!modalsState.updateUserModalIsShown}
      />
      <DeleteUserForm
        formIsOpen={modalsState.deleteUserModalIsShown}
        hideModal={() =>
          setModalsState((prevValue) => ({
            ...prevValue,
            deleteUserModalIsShown: false,
          }))
        }
        resetFormValues={!modalsState.deleteUserModalIsShown}
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
      <Modal
        requestIsSuccessful
        isShown={modalsState.expiredTokenModalIsShown}
        hideModal={() =>
          setModalsState((prevValue) => ({
            ...prevValue,
            expiredTokenModalIsShown: false,
          }))
        }
        title="Expired Token"
      >
        <p className={styles.expiredTokenMessage}>
          ⛔ Expired token. Log in again ⛔
        </p>
      </Modal>
      <main className={styles.mainContainer}>{renderResourceCards()}</main>
    </>
  );
}
export default Page;
