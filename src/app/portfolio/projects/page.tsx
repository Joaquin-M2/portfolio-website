"use client";

import { useState, useEffect, useRef } from "react";

import FiltersBar from "@/components/FiltersBar/FiltersBar";
import Slider from "@/components/Slider/Slider";

import SliderThumbnailsContainer from "@/components/Slider/SliderThumbnailsContainer/SliderThumbnailsContainer";
import MoveSlideButton from "@/components/Slider/MoveSlideButton/MoveSlideButton";
import SliderThumbnail from "@/components/Slider/SliderThumbnailsContainer/SliderThumbnail/SliderThumbnail";

import tech from "@/data/techs-names";
import projects from "@/data/projects";

import styles from "../portfolio.module.scss";

export default function Page() {
  const [activeThumbnail, setActiveThumbnail] = useState(1);
  const [activeFilters, setActiveFilters] = useState([]);
  const sliderAndButtonsContainer = useRef();

  const currentSelectedProject = projects.findIndex(
    (project) => project.id === activeThumbnail
  );

  let thumbnails = [];

  for (const project of projects) {
    if (
      activeFilters.length === 0 ||
      activeFilters.every((filter) => project.technologies.includes(filter))
    ) {
      thumbnails.push(
        <SliderThumbnail
          forAttribute={projects[project.id - 1].id}
          id={projects[project.id - 1].id}
          image={projects[project.id - 1].image}
          key={projects[project.id - 1].id}
          updateStateForActiveThumbnail={() =>
            setActiveThumbnail(projects[project.id - 1].id)
          }
          setButtonIsChecked={activeThumbnail === projects[project.id - 1].id}
        />
      );
    }
  }

  // Change the "activeThumbnail" state when the thumbnail itself changes. The "useEffect()" hook is
  // necessary to update the "activeFilters" state when the "thumbnails" variable has been updated after
  // the re-rendering process, NOT before.
  useEffect(() => {
    if (
      !thumbnails.some((thumbnail) => thumbnail.props.id === activeThumbnail)
    ) {
      setActiveThumbnail(thumbnails[0].props.id);
    }
  }, [activeFilters]);

  ////////////////
  // FUNCTIONS

  const prevProjectHandler = () => {
    if (activeThumbnail > thumbnails[0].props.id) {
      setActiveThumbnail((prevState) => prevState - 1);
    } else {
      setActiveThumbnail(thumbnails[thumbnails.length - 1].props.id);
    }
  };

  const nextProjectHandler = () => {
    if (activeThumbnail < projects.length) {
      setActiveThumbnail((prevState) => prevState + 1);
    } else {
      setActiveThumbnail(thumbnails[0].props.id);
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
              tech.NEXT,
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
                projectTitle={projects[currentSelectedProject].title}
                imageSrc={projects[currentSelectedProject].image}
                projectDescription={
                  projects[currentSelectedProject].description
                }
                repositoryLink={projects[currentSelectedProject].linkToCode}
                liveProjectLink={projects[currentSelectedProject].linkToProject}
                activeThumbnail={activeThumbnail}
                prevProject={prevProjectHandler}
                nextProject={nextProjectHandler}
              >
                {projects[currentSelectedProject].details}
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
