"use client";

import { useRef, useEffect, useState } from "react";
import FilterButton from "./FilterButton/FilterButton";

import styles from "./filtersBar.module.scss";

export default function FiltersBar(props) {
  const toggleButton = useRef<HTMLInputElement>();
  const blackSail = useRef<HTMLDivElement>();
  const [buttonIsChecked, setButtonIsChecked] = useState(true);

  ///////////////////////////
  // CREATE FILTER BUTTONS

  function createFilterButton(...filters) {
    let allTechFilters = [];
    for (const filter of filters[0]) {
      allTechFilters.push(
        <FilterButton addAndRemoveFilter={props.changeFilter} key={`${filter}`}>
          {filter}
        </FilterButton>
      );
    }
    return allTechFilters;
  }

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
      <aside className={`${styles.FiltersBar} ${props.additionalStyles}`}>
        <label
          className={styles.FiltersPanelButton}
          htmlFor="filters-panel"
        ></label>
        <h3 className={styles.FiltersBar_Title}>Filter per Technology</h3>
        <ul className={styles.FiltersBar_List}>
          {createFilterButton(props.filterButtons)}
        </ul>
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
