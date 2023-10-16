"use client";

import { useEffect, useRef, useState } from "react";

import ToolCard from "../../components/ToolCard/ToolCard";
import FiltersBar2 from "../../components/FiltersBar2/FiltersBar2";

import styles from "./tools.module.scss";

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
      console.log(filteredTools, selectedFilterTags);
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
      return <h1 className={styles.notFoundTitle}>Loading...</h1>;
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
      return <h1 className={styles.notFoundTitle}>No tools found.</h1>;
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
      <main className={styles.mainContainer}>{renderToolCards()}</main>
    </>
  );
}
export default Page;
