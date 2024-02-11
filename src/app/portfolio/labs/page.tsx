"use client";

import { useState, useEffect, useRef } from "react";

import FiltersBar from "@/components/FiltersBar/FiltersBar";
import Slider from "@/components/Slider/Slider";

import SliderThumbnailsContainer from "@/components/Slider/SliderThumbnailsContainer/SliderThumbnailsContainer";
import MoveSlideButton from "@/components/Slider/MoveSlideButton/MoveSlideButton";
import SliderThumbnail from "@/components/Slider/SliderThumbnailsContainer/SliderThumbnail/SliderThumbnail";

import tech from "@/data/techs-names";
import labsData from "@/data/labs";

import styles from "../portfolio.module.scss";

export default function Page() {
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [activeFilters, setActiveFilters] = useState([]);
  const [labs, setLabs] = useState(labsData);
  const sliderAndButtonsContainer = useRef();

  ////////////////
  // THUMBNAILS

  let thumbnails = [];

  for (const [idx, lab] of labs.entries()) {
    if (
      activeFilters.length === 0 ||
      activeFilters.every((filter) => lab.technologies.includes(filter))
    ) {
      thumbnails.push(
        <SliderThumbnail
          image={lab.image}
          key={lab.id}
          updateStateForActiveThumbnail={() => setActiveThumbnail(idx)}
          setButtonIsChecked={activeThumbnail === idx}
        />
      );
    }
  }

  useEffect(() => {
    setActiveThumbnail(0);

    setLabs(
      labsData.filter((lab) =>
        activeFilters.every((filter) => lab.technologies.includes(filter))
      )
    );
  }, [activeFilters]);

  ////////////////
  // FUNCTIONS

  const prevProjectHandler = () => {
    if (activeThumbnail > 0) {
      setActiveThumbnail((prevState) => prevState - 1);
    } else {
      setActiveThumbnail(thumbnails.length - 1);
    }
  };

  const nextProjectHandler = () => {
    if (activeThumbnail < labs.length - 1) {
      setActiveThumbnail((prevState) => prevState + 1);
    } else {
      setActiveThumbnail(0);
    }
  };

  const addOrRemoveFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(
        activeFilters.filter((webDevTech) => webDevTech !== filter)
      );
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  return (
    <>
      <div className={styles.SupraMainContainer}>
        <main className={styles.MainContainer}>
          <FiltersBar
            additionalStyles={styles.PortfolioFiltersBar}
            changeFilter={(event) =>
              addOrRemoveFilter(
                event.target.closest("li").textContent.replace(/OnOff/g, "")
              )
            }
            filterButtons={[
              tech.HTML,
              tech.CSS,
              tech.JAVASCRIPT,
              tech.TYPESCRIPT,
              tech.REACT,
              // tech.NEXT,
              // tech.NODEJS,
              // tech.EXPRESS,
              // tech.KOTLIN,
              // tech.PYTHON,
              // tech.SQL,
              // tech.NOSQL,
            ]}
          />
          <div className={styles.NoFiltersContainer}>
            <div
              className={styles.SlideAndButtonsContainer}
              ref={sliderAndButtonsContainer}
            >
              <MoveSlideButton
                additionalStyles={styles.PrevButton}
                changeSlide={() => prevProjectHandler()}
                leftwardsArrow
              />
              <Slider
                additionalStyles={styles.PortfolioSlider}
                projectTitle={labs[activeThumbnail].title}
                imageSrc={labs[activeThumbnail].image}
                projectDescription={labs[activeThumbnail].description}
                repositoryLink={labs[activeThumbnail].linkToCode}
                liveProjectLink={labs[activeThumbnail].linkToProject}
                activeThumbnail={activeThumbnail}
                prevProject={prevProjectHandler}
                nextProject={nextProjectHandler}
              >
                {labs[activeThumbnail].details}
              </Slider>
              <MoveSlideButton
                additionalStyles={styles.NextButton}
                changeSlide={() => nextProjectHandler()}
              />
            </div>
            <SliderThumbnailsContainer>{thumbnails}</SliderThumbnailsContainer>
          </div>
        </main>
      </div>
    </>
  );
}
