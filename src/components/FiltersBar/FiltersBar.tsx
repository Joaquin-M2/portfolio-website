"use client";

import { useState } from "react";

import Backdrop from "@/components/Backdrop/Backdrop";
import FilterButton from "./FilterButton/FilterButton";

import styles from "./filtersBar.module.scss";

export default function FiltersBar({
  additionalStyles,
  changeFilter,
  filterButtons,
}) {
  const [buttonIsChecked, setButtonIsChecked] = useState(false);

  ///////////////////////////
  // CREATE FILTER BUTTONS

  function createFilterButton(...filters) {
    let allTechFilters = [];
    for (const filter of filters[0]) {
      allTechFilters.push(
        <FilterButton addAndRemoveFilter={changeFilter} key={`${filter}`}>
          {filter}
        </FilterButton>
      );
    }
    return allTechFilters;
  }

  return (
    <>
      <Backdrop
        forLeftAside
        isShown={buttonIsChecked}
        hideBackdrop={() => setButtonIsChecked(false)}
      >
        <aside className={`${styles.FiltersBar} ${additionalStyles}`}>
          <label
            className={styles.FiltersPanelButton}
            onClick={() => {
              setButtonIsChecked((prevState) => !prevState);
            }}
          ></label>
          <h3 className={styles.FiltersBar_Title}>Filter per Technology</h3>
          <ul className={styles.FiltersBar_List}>
            {createFilterButton(filterButtons)}
          </ul>
        </aside>
      </Backdrop>
    </>
  );
}
