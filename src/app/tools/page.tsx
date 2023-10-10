'use client';

import { useEffect, useRef, useState } from 'react';

import toolsData from '../../data/tools';

import ToolCard from '../../components/ToolCard/ToolCard';
import FiltersBar2 from '../../components/FiltersBar2/FiltersBar2';

import styles from './tools.module.scss';

function Page() {
  const [toolsInLocalstorage, setToolsInLocalstorage] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [searchFieldValue, setSearchFieldValue] = useState('');
  const [filterTags, setFilterTags] = useState([]);
  const previousFilterTagsQuantity = useRef(filterTags.length);
  const searchFieldTools = useRef([]);

  useEffect(() => {
    fetch('http://localhost:4000/tools')
      .then((response) => response.json())
      .then((data) => setFilteredTools(data.tools))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('toolsId'))
    ) {
      setToolsInLocalstorage(JSON.parse(localStorage.getItem('toolsId')));
    } else {
      setToolsInLocalstorage([]);
    }
  }, []);

  // TODO: 'setFilteredTools()' tiene que usar siempre "prevValue". Si uso "toolsData", ignora el resto de filtros (ya sea del input de
  // búsqueda o de las etiquetas seleccionadas).

  const filterBySearch = (event) => {
    if (event.target.value.length > searchFieldValue.length) {
      setFilteredTools((prevValue) =>
        prevValue.filter((tool) => {
          return tool.title.includes(event.target.value);
        })
      );
    } else {
      if (filterTags) {
        setFilteredTools(
          toolsData.filter((tool) => {
            return filterTags.every((filterTag) =>
              tool.tags.includes(filterTag)
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
          toolsData.filter((tool) => {
            return tool.title.includes(event.target.value);
          })
        );
      }
    }
    setSearchFieldValue(event.target.value);
    searchFieldTools.current = toolsData.filter((tool) => {
      return tool.title.includes(searchFieldValue);
    });
  };

  const filterByTag = (event) => {
    setFilterTags((prevValue) => [...prevValue, event.target.value]);
  };
  const handleRemoveFilterTag = (event) => {
    setFilterTags((prevValue) =>
      prevValue.filter((tag) => tag !== event.target.textContent)
    );
  };
  useEffect(() => {
    // Required in order to have "filterTags" updated before executing "setFilteredTools".
    searchFieldTools.current = toolsData.filter((tool) => {
      return tool.title.includes(searchFieldValue);
    });

    if (filterTags.length > previousFilterTagsQuantity.current) {
      setFilteredTools((prevValue) =>
        prevValue.filter((tool) => {
          return filterTags.every((filterTag) => tool.tags.includes(filterTag));
        })
      );
    } else if (filterTags.length < previousFilterTagsQuantity.current) {
      setFilteredTools(
        searchFieldTools.current.filter((tool) => {
          return filterTags.every((filterTag) => tool.tags.includes(filterTag));
        })
      );
    }

    previousFilterTagsQuantity.current = filterTags.length;
  }, [filterTags]);

  return (
    <>
      <FiltersBar2
        filterBySearchFunction={filterBySearch}
        filterByTagFunction={filterByTag}
        filterTags={filterTags}
        handleRemoveFilterTag={handleRemoveFilterTag}
      />
      <main className={styles.mainContainer}>
        {filteredTools
          ? filteredTools
              .sort(
                (a, b) =>
                  toolsInLocalstorage.indexOf(b.id.toString()) -
                  toolsInLocalstorage.indexOf(a.id.toString())
              )
              .map(({ _id, toolImage, title, description, tags }) => (
                <ToolCard
                  toolsInLocalstorage={toolsInLocalstorage}
                  key={_id}
                  id={_id.toString()}
                  url={'123'}
                  logo={toolImage}
                  title={title}
                  description={description}
                  tags={tags}
                />
              ))
          : 'Loading...'}
        {!filteredTools.length && (
          <h1 className={styles.notFoundTitle}>No tools found.</h1>
        )}
      </main>
    </>
  );
}
export default Page;
