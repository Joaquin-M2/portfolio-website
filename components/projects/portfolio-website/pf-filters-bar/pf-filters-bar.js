import { useRef, useEffect, useState } from 'react';
import styles from './pf-filters-bar.module.scss';

import PortfolioFilterButton from './pf-filter-button/pf-filter-button';

export default function PortfolioFiltersBar(props) {
    const toggleButton = useRef();
    const blackSail = useRef();
    const [buttonIsChecked, setButtonIsChecked] = useState(true);

    ///////////////////////////
    // CREATE FILTER BUTTONS

    function createFilterButton(...filters) {
        let allTechFilters = [];
        for (const filter of filters[0]) {
            allTechFilters.push(
                <PortfolioFilterButton
                    addAndRemoveFilter={props.changeFilter}
                    key={`${filter}`}
                >
                    {filter}
                </PortfolioFilterButton>
            );
        }
        return allTechFilters;
    }

    /////////////////////////////
    // RESPONSIVE FUNCTIONALITY

    useEffect(() => {
        if (window.innerWidth > 1279) {
            setButtonIsChecked(false);
        }
        if (
            window.innerWidth <= 1279 &&
            toggleButton.current.checked === false
        ) {
            blackSail.current.style.display = 'block';
        } else {
            blackSail.current.style.display = 'none';
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
                <h3 className={styles.FiltersBar_Title}>
                    Filter per Technology
                </h3>
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
