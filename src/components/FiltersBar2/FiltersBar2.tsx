"use client";

import {
  ChangeEvent,
  MouseEvent,
  forwardRef,
  useEffect,
  useState,
} from "react";

import Tag from "@/components/Tag/Tag";
import Backdrop from "@/components/Backdrop/Backdrop";

import styles from "./filtersBar2.module.scss";

type Tag = { name: string; _id: string };

interface FiltersBar2Props {
  filterBySearchFunction?: (event: ChangeEvent<HTMLInputElement>) => void;
  filterByTagFunction: (event: MouseEvent<HTMLOptionElement>) => void;
  filterByExcludingTagFunction: (event: MouseEvent<HTMLOptionElement>) => void;
  handleRemoveFilterTag: (event: MouseEvent<HTMLButtonElement>) => void;
  handleRemoveExcludingFilterTag: (
    event: MouseEvent<HTMLButtonElement>
  ) => void;
  selectedFilterTags: string[];
  selectedExcludingFilterTags: string[];
  tags: Tag[];
  toolsQuantity: number;
  [x: string]: any;
}

const FiltersBar2 = forwardRef<HTMLInputElement, FiltersBar2Props>(
  (
    {
      filterBySearchFunction,
      filterByTagFunction,
      filterByExcludingTagFunction,
      selectedFilterTags,
      selectedExcludingFilterTags,
      handleRemoveFilterTag,
      handleRemoveExcludingFilterTag,
      tags,
      toolsQuantity,
      pushSearchType,
    },
    ref
  ) => {
    const [buttonIsChecked, setButtonIsChecked] = useState(false);
    const [selectedRadioButton, setSelectedRadioButton] = useState("by-title");

    const selectedFilterTagsOptions = tags.length ? (
      tags
        .filter(
          (tag) =>
            !selectedFilterTags.includes(tag.name) &&
            !selectedExcludingFilterTags.includes(tag.name)
        )
        .map((tag, id) => (
          <option key={id} value={tag.name} onClick={filterByTagFunction}>
            {tag.name}
          </option>
        ))
    ) : (
      <option>Loading...</option>
    );

    const selectedExcludingFilterTagsOptions = tags.length ? (
      tags
        .filter(
          (tag) =>
            !selectedFilterTags.includes(tag.name) &&
            !selectedExcludingFilterTags.includes(tag.name)
        )
        .map((tag, id) => (
          <option
            key={id}
            value={tag.name}
            onClick={filterByExcludingTagFunction}
          >
            {tag.name}
          </option>
        ))
    ) : (
      <option>Loading...</option>
    );

    useEffect(() => {
      pushSearchType(selectedRadioButton);
    }, [selectedRadioButton]);

    return (
      <>
        <Backdrop
          isShown={buttonIsChecked}
          hideBackdrop={() => setButtonIsChecked(false)}
        />
        <aside
          className={`${styles.container} ${
            buttonIsChecked && styles.showFiltersBar
          }`}
        >
          <button
            role="checkbox"
            aria-checked={buttonIsChecked}
            className={styles.FiltersPanelButton}
            onClick={() => {
              setButtonIsChecked((prevState) => !prevState);
            }}
          >
            FILTERS
          </button>
          <div className={styles.toolsFoundAndSearchWrapper}>
            <fieldset className={styles.titleFieldset}>
              <legend className={styles.titleLegend}>
                Filter by{" "}
                {`${
                  selectedRadioButton === "by-title" ? "Title" : "Description"
                }`}
              </legend>
              <input
                className={styles.searchInput}
                type="search"
                placeholder={`Search by tool ${
                  selectedRadioButton === "by-title" ? "title" : "description"
                } - Case sensitive`}
                maxLength={25}
                onChange={filterBySearchFunction}
                ref={ref as React.Ref<HTMLInputElement>}
              />
              <div className={styles.searchRadioButtons}>
                <div className={styles.radioButton}>
                  <input
                    type="radio"
                    id="by-title"
                    name="search-input"
                    value="by-title"
                    checked={selectedRadioButton === "by-title"}
                    onChange={() => setSelectedRadioButton("by-title")}
                  />
                  <label htmlFor="by-title">By Title</label>
                </div>
                <div className={styles.radioButton}>
                  <input
                    type="radio"
                    id="by-description"
                    name="search-input"
                    value="by-description"
                    checked={selectedRadioButton === "by-description"}
                    onChange={() => setSelectedRadioButton("by-description")}
                  />
                  <label htmlFor="by-description">By Description</label>
                </div>
              </div>
            </fieldset>
            <p className={styles.toolsFound}>
              <span className={styles.toolsFoundSpan}>Tools found:</span>{" "}
              {toolsQuantity}
            </p>
          </div>
          <fieldset className={styles.tagFieldset}>
            <legend className={styles.tagLegend}>
              Filter by Tag(s) - Included
            </legend>
            <select className={styles.selectInput} name="tags" multiple>
              {selectedFilterTagsOptions}
            </select>
            <div className={styles.tagsContainer} role="list">
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
          <fieldset className={styles.tagFieldset}>
            <legend className={styles.tagLegend}>
              Filter by Tag(s) - Excluded
            </legend>
            <select className={styles.selectInput} name="tags" multiple>
              {selectedExcludingFilterTagsOptions}
            </select>
            <div className={styles.tagsContainer} role="list">
              {selectedExcludingFilterTags.map((tag, id) => (
                <Tag
                  key={id}
                  isFilterButton
                  handleRemoveFilterTag={handleRemoveExcludingFilterTag}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </fieldset>
        </aside>
      </>
    );
  }
);
export default FiltersBar2;
