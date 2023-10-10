'use client';

import { useEffect } from 'react';
import { toolsFiltersTags } from '../../data/tools-filter-tags';
import Tag from '../ToolCard/Tag/Tag';

import styles from './filtersBar2.module.scss';

function FiltersBar2({
  filterBySearchFunction,
  filterByTagFunction,
  filterTags,
  handleRemoveFilterTag,
}) {
  useEffect(() => {}, [filterTags]);

  const dropdownOptions = toolsFiltersTags
    .filter((toolFilterTag) => !filterTags.includes(toolFilterTag))
    .map((filterTag, id) => (
      <option key={id} value={filterTag}>
        {filterTag}
      </option>
    ));
  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <fieldset className={styles.titleFieldset}>
            <legend className={styles.titleLegend}>Filter by Title</legend>
            <input
              className={styles.searchInput}
              type='search'
              placeholder='Search by tool title - Case sensitive'
              maxLength={25}
              onChange={filterBySearchFunction}
            />
          </fieldset>
          <fieldset className={styles.tagFieldset}>
            <legend className={styles.tagLegend}>Filter by Tag</legend>
            <select
              className={styles.selectInput}
              name='tags'
              onClick={filterByTagFunction}
              multiple
            >
              {dropdownOptions}
            </select>
            <div className={styles.tagsContainer}>
              {filterTags.map((tag, id) => (
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
