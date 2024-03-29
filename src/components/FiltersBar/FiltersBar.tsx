"use client";

import { ChangeEvent, useState } from "react";

import Backdrop from "@/components/Backdrop/Backdrop";
import FilterButton from "./FilterButton/FilterButton";

import styles from "./filtersBar.module.scss";

interface FiltersBarProps {
  additionalStyles?: string;
  changeFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  filterButtons: string[];
}

export default function FiltersBar({
  additionalStyles,
  changeFilter,
  filterButtons,
}: FiltersBarProps) {
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
        isShown={buttonIsChecked}
        hideBackdrop={() => setButtonIsChecked(false)}
      />
      <aside
        className={`${styles.FiltersBar} ${
          buttonIsChecked && styles.showFiltersBar
        } ${additionalStyles}`}
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
        <h3 className={styles.FiltersBar_Title}>Filter per Technology</h3>
        <ul className={styles.FiltersBar_List}>
          {createFilterButton(filterButtons)}
        </ul>
      </aside>
    </>
  );
}
