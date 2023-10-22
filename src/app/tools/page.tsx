"use client";

import { useEffect, useRef, useState } from "react";

import Modal from "../../components/Modal/Modal";
import ToolCard from "../../components/ToolCard/ToolCard";
import FiltersBar2 from "../../components/FiltersBar2/FiltersBar2";

import styles from "./tools.module.scss";
import Button from "../../components/Button.tsx/Button";

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
  const [toolsInLocalstorage, setToolsInLocalstorage] = useState([]);
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>();
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [selectedFilterTags, setSelectedFilterTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loginModalIsShown, setLoginModalIsShown] = useState(false);
  const [signupModalIsShown, setSignupModalIsShown] = useState(false);
  const previousFilterTagsQuantity = useRef(selectedFilterTags.length);
  const searchFieldTools = useRef([]);

  useEffect(() => {
    fetch("http://localhost:4000/tools")
      .then((response) => response.json())
      .then((data) => {
        setTools(data.tools);
        setFilteredTools(data.tools);
      })
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/tags")
      .then((response) => response.json())
      .then((data) => setTags(data.tags))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("toolsId"))
    ) {
      setToolsInLocalstorage(JSON.parse(localStorage.getItem("toolsId")));
    } else {
      setToolsInLocalstorage([]);
    }
  }, []);

  // TODO: 'setFilteredTools()' tiene que usar siempre "prevValue". Si uso "toolsData" ignora el resto de filtros (ya sea del input de
  // búsqueda o de las etiquetas seleccionadas).

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

  const renderToolCards: () => JSX.Element | JSX.Element[] = () => {
    if (isLoading) {
      return <h1 className={styles.notToolsTitle}>Loading...</h1>;
    } else if (!isLoading && filteredTools.length) {
      return filteredTools
        .sort(
          (a, b) =>
            toolsInLocalstorage.indexOf(b._id.toString()) -
            toolsInLocalstorage.indexOf(a._id.toString())
        )
        .map(({ _id, iconUrl, title, description, tags, url }) => (
          <ToolCard
            toolsInLocalstorage={toolsInLocalstorage}
            key={_id}
            id={_id.toString()}
            url={url}
            logo={iconUrl}
            title={title}
            description={description}
            tags={tags}
          />
        ));
    } else {
      return <h1 className={styles.notToolsTitle}>No tools found.</h1>;
    }
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
        <button
          className={styles.logInButton}
          onClick={() => {
            setLoginModalIsShown(true);
          }}
        >
          <label htmlFor="log-in-modal">Log In</label>
        </button>
        <button
          className={styles.signUpButton}
          onClick={() => {
            setSignupModalIsShown(true);
          }}
        >
          <label htmlFor="sign-up-modal">Sign Up</label>
        </button>
      </div>
      <Modal
        bottomButtons={
          <>
            <Button small>Accept</Button>
            <Button small>Cancel</Button>
          </>
        }
        isShown={loginModalIsShown}
        modalId="log-in-modal"
        setModalIsShown={setLoginModalIsShown}
        title="Test - Log in Modal"
      >
        <p>Testing login modal</p>
      </Modal>
      <Modal
        bottomButtons={
          <>
            <Button small>Accept</Button>
            <Button small>Cancel</Button>
          </>
        }
        isShown={signupModalIsShown}
        modalId="sign-up-modal"
        setModalIsShown={setSignupModalIsShown}
        title="Test - Sign up Modal"
      >
        <p>Testing signup modal</p>
      </Modal>
      <main className={styles.mainContainer}>{renderToolCards()}</main>
    </>
  );
}
export default Page;
