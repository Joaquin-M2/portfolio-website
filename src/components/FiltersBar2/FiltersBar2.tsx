"use client";

import { useEffect, useRef, useState } from "react";
import Tag from "../ToolCard/Tag/Tag";

import styles from "./filtersBar2.module.scss";

function FiltersBar2({
  filterBySearchFunction,
  filterByTagFunction,
  selectedFilterTags,
  handleRemoveFilterTag,
  tags,
}) {
  const toggleButton = useRef<HTMLInputElement>();
  const blackSail = useRef<HTMLDivElement>();
  const [buttonIsChecked, setButtonIsChecked] = useState(true);

  const dropdownOptions = tags.length ? (
    tags
      .filter((tag) => !selectedFilterTags.includes(tag.name))
      .map((tag, id) => (
        <option key={id} value={tag.name} onClick={filterByTagFunction}>
          {tag.name}
        </option>
      ))
  ) : (
    <option>Loading...</option>
  );

  useEffect(() => {
    if (toggleButton.current.checked === false) {
      blackSail.current.style.display = "block";
    } else {
      blackSail.current.style.display = "none";
    }
  }, [buttonIsChecked]);

  return (
    <>
      <input
        ref={toggleButton}
        className={styles.FiltersPanelCheckbox}
        type="checkbox"
        id="filters-panel"
        name="slider-filters-panel"
        checked={buttonIsChecked}
        onChange={() => {
          setButtonIsChecked((prevState) => !prevState);
        }}
      />
      <aside className={styles.container}>
        <label
          className={styles.FiltersPanelButton}
          htmlFor="filters-panel"
        ></label>
        <fieldset className={styles.titleFieldset}>
          <legend className={styles.titleLegend}>Filter by Title</legend>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search by tool title - Case sensitive"
            maxLength={25}
            onChange={filterBySearchFunction}
          />
        </fieldset>
        <fieldset className={styles.tagFieldset}>
          <legend className={styles.tagLegend}>Filter by Tag</legend>
          <select className={styles.selectInput} name="tags" multiple>
            {dropdownOptions}
          </select>
          <div className={styles.tagsContainer}>
            {selectedFilterTags.map((tag, id) => (
              <Tag
                key={id}
                isFilterButton
                handleRemoveFilterTag={handleRemoveFilterTag}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </fieldset>
      </aside>
      <div
        ref={blackSail}
        className={styles.blackSail}
        onClick={() => {
          toggleButton.current.checked = true;
          setButtonIsChecked((prevState) => !prevState);
        }}
      ></div>
    </>
  );
}
export default FiltersBar2;
