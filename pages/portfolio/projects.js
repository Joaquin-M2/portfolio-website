import Head from 'next/head';

import {useState, useEffect, useRef} from 'react';

import styles from './portfolio.module.scss';

import NavBarBottom from '../../components/nav-bar-bottom/nav-bar-bottom';
import PortfolioFiltersBar from '../../components/pf-filters-bar/pf-filters-bar';
//import PortfolioFilterButton from '../../components/pf-filters-bar/pf-filter-button/pf-filter-button';
import NavBarTopButton from '../../components/nav-bar-top/nav-bar-top';
import PortfolioSlider from '../../components/pf-slider/pf-slider';

import PortfolioSliderThumbnailsContainer from '../../components/pf-slider/pf-slider-thumbnails-container/pf-slider-thumbnails-container';
import MoveSlideButton from '../../components/pf-slider/pf-move-slide-button/pf-move-slide-button';
import PortfolioSliderThumbnail from '../../components/pf-slider/pf-slider-thumbnails-container/pf-slider-thumbnail/pf-slider-thumbnail';

import tech from '../../data/techs-names';

import projects from '../../data/projects';

export default function Projects() {
  const [activeThumbnail, setActiveThumbnail] = useState(1);
  const [activeFilters, setActiveFilters] = useState([]);
  const sliderAndButtonsContainer = useRef();

  const currentSelectedProject = projects.findIndex(project => project.id === activeThumbnail);

  let thumbnails = [];

    for (const project of projects) {
      if (activeFilters.length === 0 || 
          activeFilters.every(filtro => project.technologies.includes(filtro))
          ) {
        thumbnails.push(<PortfolioSliderThumbnail forAttribute={projects[project.id - 1].id} 
                                                  id={projects[project.id - 1].id} 
                                                  image={projects[project.id - 1].image} 
                                                  key={projects[project.id - 1].id} 
                                                  
                                                  updateStateForActiveThumbnail={() => setActiveThumbnail(projects[project.id - 1].id)}

                                                  setCheckedButton={activeThumbnail === projects[project.id - 1].id}
                                                  styleActiveThumbnail={activeThumbnail === projects[project.id - 1].id ? styles.activateLabelStyle : null}
                                                  styleNonActiveThumbnail={activeThumbnail === projects[project.id - 1].id ? styles.nonActiveThumbnailImage : null}
                        />)
      }
    }

  // Change the "activeThumbnail" state when the thumbnail itself changes. The "useEffect()" hook is 
  // necessary to update the "activeFilters" state when the "thumbnails" variable has been updated after
  // the re-rendering process, NOT before.
  useEffect(() => {
    if (!thumbnails.some(thumbnail => thumbnail.props.id === activeThumbnail)) {
    setActiveThumbnail(thumbnails[0].props.id);
    }
  }, [activeFilters]);


  ////////////////
  // FUNCTIONS

  const prevProjectHandler = () => {
    if (activeThumbnail > thumbnails[0].props.id) {
      setActiveThumbnail(prevState => prevState - 1)
    } else {
      setActiveThumbnail(thumbnails[thumbnails.length - 1].props.id)
    }
  }

  const nextProjectHandler = () => {
    if (activeThumbnail < projects.length) {
      setActiveThumbnail(prevState => prevState + 1)
    } else {
      setActiveThumbnail(thumbnails[0].props.id)
    }
  }

  const addOrRemoveFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(webDevTech => webDevTech !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  }

  return (
    <>
      <Head>
        <title>Portfolio: Projects - JM2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.SupraMainContainer}>
        <main className={styles.MainContainer}>
          <PortfolioFiltersBar 
            additionalStyles={styles.PortfolioFiltersBar} 
            changeFilter={(event) => addOrRemoveFilter(event.target.closest('li').textContent.replace(/OnOff/g, ''))} 
            filterButtons={[tech.HTML, 
                            tech.CSS, 
                            tech.JAVASCRIPT, 
                            tech.TYPESCRIPT, 
                            tech.REACT, 
                            tech.NEXT, 
                            tech.NODEJS,
                            tech.EXPRESS,
                            tech.KOTLIN,
                            tech.PYTHON,
                            tech.SQL,
                            tech.NOSQL
                          ]}
          />
          <div className={styles.NoFiltersContainer}>
            <nav className={styles.NextToFiltersContainer_TopNavBar}>
                <NavBarTopButton link="/portfolio/projects">Projects</NavBarTopButton>
                <NavBarTopButton link="/portfolio/labs">Labs</NavBarTopButton>
            </nav>
            <div className={styles.SlideAndButtonsContainer}
                 ref={sliderAndButtonsContainer}
            >
              <MoveSlideButton 
                additionalStyles={styles.PrevButton}
                changeSlide={() => prevProjectHandler()} 
              />
              <PortfolioSlider additionalStyles={styles.PortfolioSlider} 
                              srcAttribute={projects[currentSelectedProject].image}
                              projectDescription={projects[currentSelectedProject].description}
                              checkTheCode={projects[currentSelectedProject].linkToCode}
                              checkTheProject={projects[currentSelectedProject].linkToProject}

                              activeThumbnail={activeThumbnail}
                              prevProject={prevProjectHandler}
                              nextProject={nextProjectHandler}
              >
                {projects[currentSelectedProject].details}
              </PortfolioSlider>
              <MoveSlideButton 
                additionalStyles={styles.NextButton}
                changeSlide={() => nextProjectHandler()} 
              />
            </div>
            <PortfolioSliderThumbnailsContainer>
              {thumbnails}
            </PortfolioSliderThumbnailsContainer>
          </div>
        </main>
        <NavBarBottom additionalStyles={styles.NavBarBottom} />
        </div>
    </>
  )
}