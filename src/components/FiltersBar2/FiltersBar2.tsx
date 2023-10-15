"use client";

import Tag from "../ToolCard/Tag/Tag";

import styles from "./filtersBar2.module.scss";

function FiltersBar2({
  filterBySearchFunction,
  filterByTagFunction,
  selectedFilterTags,
  handleRemoveFilterTag,
  tags,
}) {
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
  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
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
        </div>
      </div>
    </>
  );
}
export default FiltersBar2;
