"use client";

import { useState } from "react";

import Tag from "@/components/Tag/Tag";
import Backdrop from "@/components/Backdrop/Backdrop";

import styles from "./filtersBar2.module.scss";

type Tag = { name: string; _id: string };

interface FiltersBar2Props {
  filterBySearchFunction?: (event: any) => void;
  filterByTagFunction: (event: any) => void;
  handleRemoveFilterTag: (event: any) => void;
  selectedFilterTags: string[];
  tags: Tag[];
}

function FiltersBar2({
  filterBySearchFunction,
  filterByTagFunction,
  selectedFilterTags,
  handleRemoveFilterTag,
  tags,
}: FiltersBar2Props) {
  const [buttonIsChecked, setButtonIsChecked] = useState(false);

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
      <Backdrop
        forTopAside
        isShown={buttonIsChecked}
        hideBackdrop={() => setButtonIsChecked(false)}
      >
        <aside className={styles.container}>
          <label
            className={styles.FiltersPanelButton}
            onClick={() => {
              setButtonIsChecked((prevState) => !prevState);
            }}
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
      </Backdrop>
    </>
  );
}
export default FiltersBar2;
