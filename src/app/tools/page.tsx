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
import UpdateTagForm from "./UpdateTagForm";
import DeleteTagForm from "./DeleteTagForm";
import UpdateUserForm from "./UpdateUserForm";
import DeleteUserForm from "./DeleteUserForm";
import Modal from "../../components/Modal/Modal";
import checkJwtTokenHasExpired from "../../utils/check-user-token-expiration";
import AddIconForm from "./AddIconForm";
import UpdateIconForm from "./UpdateIconForm";
import DeleteIconForm from "./DeleteIconForm";
import getUserTokenData from "../../utils/get-user-token-data";

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
  console.log(window.location.port);
  const [userAllFavoriteTools, setUserAllFavoriteTools] = useState([]);
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>();
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [selectedFilterTags, setSelectedFilterTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [icons, setIcons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const previousFilterTagsQuantity = useRef(selectedFilterTags.length);
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
    if (typeof window !== "undefined") {
      if (JSON.parse(localStorage.getItem("accountFavoriteToolsId"))) {
        setUserAllFavoriteTools((prevValue) => {
          const allValues = [
            ...JSON.parse(localStorage.getItem("accountFavoriteToolsId")),
            ...prevValue,
          ];
          return [...new Set(allValues)];
        });
      }
    }
  }, [userIsLoggedIn]);

  const renderToolCards: () => JSX.Element | JSX.Element[] = () => {
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
                checkTokenHasExpired(`deleteToolModalIsShown${_id}`);
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
              allOptions={tags}
              toolTags={toolTags}
              title={title}
              description={description}
              userAllFavoriteTools={userAllFavoriteTools}
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

  const logoutUser = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("accountFavoriteToolsId");
    setUserAllFavoriteTools([]);
    setUserIsLoggedIn(false);
  };

  const renderUserManagementButtons: () => JSX.Element | JSX.Element[] = () => {
    return (
      <>
        {userIsLoggedIn ? (
          <>
            <button
              className={styles.managementButton}
              onClick={() => {
                logoutUser();
                setUserIsAdmin(false);
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
        <button
          className={styles.managementButton}
          onClick={() => {
            checkTokenHasExpired("addToolModalIsShown");
            setIconsMenuCardIsVisible(false);
            setTagsMenuCardIsVisible(false);
            setUsersMenuCardIsVisible(false);
          }}
        >
          Add Tool
        </button>
        <div className={styles.menuButtonContainer}>
          <button
            className={styles.managementButton}
            onClick={() => {
              setIconsMenuCardIsVisible((prevValue) => !prevValue);
              setTagsMenuCardIsVisible(false);
              setUsersMenuCardIsVisible(false);
            }}
          >
            Icons
          </button>
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
          <button
            className={styles.managementButton}
            onClick={() => {
              setIconsMenuCardIsVisible(false);
              setTagsMenuCardIsVisible((prevValue) => !prevValue);
              setUsersMenuCardIsVisible(false);
            }}
          >
            Tags
          </button>
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
          <button
            className={styles.managementButton}
            onClick={() => {
              setIconsMenuCardIsVisible(false);
              setTagsMenuCardIsVisible(false);
              setUsersMenuCardIsVisible((prevValue) => !prevValue);
            }}
          >
            Users
          </button>
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
        {userIsAdmin ? (
          <div className={styles.adminManagementButtons}>
            {renderAdminManagementButtons()}
          </div>
        ) : (
          <div></div>
        )}
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
      <main className={styles.mainContainer}>{renderToolCards()}</main>
    </>
  );
}
export default Page;
