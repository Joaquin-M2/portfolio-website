"use client";

import { useState, useEffect, useRef } from "react";

import FiltersBar from "@/components/FiltersBar/FiltersBar";
import Slider from "@/components/Slider/Slider";

import SliderThumbnailsContainer from "@/components/Slider/SliderThumbnailsContainer/SliderThumbnailsContainer";
import MoveSlideButton from "@/components/Slider/MoveSlideButton/MoveSlideButton";
import SliderThumbnail from "@/components/Slider/SliderThumbnailsContainer/SliderThumbnail/SliderThumbnail";

import tech from "@/data/techs-names";
import projectsData from "@/data/projects";

import styles from "../portfolio.module.scss";

export default function Page() {
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [activeFilters, setActiveFilters] = useState([]);
  const [projects, setProjects] = useState(projectsData);
  const sliderAndButtonsContainer = useRef();

  ////////////////
  // THUMBNAILS

  let thumbnails = [];

  for (const [idx, project] of projects.entries()) {
    if (
      activeFilters.length === 0 ||
      activeFilters.every((filter) => project.technologies.includes(filter))
    ) {
      thumbnails.push(
        <SliderThumbnail
          image={project.image}
          key={project.id}
          updateStateForActiveThumbnail={() => setActiveThumbnail(idx)}
          setButtonIsChecked={activeThumbnail === idx}
        />
      );
    }
  }

  useEffect(() => {
    setActiveThumbnail(0);

    setProjects(
      projectsData.filter((project) =>
        activeFilters.every((filter) => project.technologies.includes(filter))
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
    if (activeThumbnail < projects.length - 1) {
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
                activeThumbnail={activeThumbnail}
                additionalStyles={styles.PortfolioSlider}
                imageSrc={projects[activeThumbnail].image}
                liveProjectLink={projects[activeThumbnail].linkToProject}
                nextProject={nextProjectHandler}
                prevProject={prevProjectHandler}
                projectDescription={projects[activeThumbnail].description}
                projectTitle={projects[activeThumbnail].title}
                repositoryLink={projects[activeThumbnail].linkToCode}
                thumbnailsQuantity={projects.length}
              >
                {projects[activeThumbnail].details}
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
