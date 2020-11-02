import Head from 'next/head';
import NavBarBottom from '../../components/projects/portfolio-website/nav-bar-bottom/nav-bar-bottom';
import styles from './skills.module.scss';

import NavBarTopButton from '../../components/projects/portfolio-website/nav-bar-top/nav-bar-top';
import SkillsBlock from '../../components/projects/portfolio-website/skills-block/skills-block';
import SkillBar from '../../components/projects/portfolio-website/skills-block/skill-bar/skill-bar';
import SkillModal from '../../components/projects/portfolio-website/skills-block/skill-modal/skill-modal';

import technologies from '../../data/skills-frontend';
import tech from '../../data/techs-names';

import {useState, useMemo} from 'react';

export default function Skills() {
  const [technology, setTechnology] = useState(tech.HTML)
  const [modalIsShown, setModalIsShown] = useState(false)
  function showModal(event) {
    setModalIsShown(true);

    setTechnology(event.target.closest('li').querySelector('span').textContent)
  }

  function closeModal() {
    setModalIsShown(false)
  }

  const currentTechnology = technologies.find(tech => tech.name === technology);


  ////////////////////////////////////////////////////////////////////
  // FUNCTION TRYING TO SIMPLIFY (DRY) THE CREATION OF SKILL BLOCKS
  // Unfinished

  // function block(...[liContent, progressPercentage, nesting]) {
  //   let mainUl = <ul className={`${styles.unorderedList} ${styles.mainUnorderedList}`}></ul>
  //   let nestingLi = <li className={styles.listElement}>
  //                     <div className={styles.listElementContainer} onClick={(event) => showModal(event)}>
  //                       <SkillBar progressPercentage={progressPercentage}>
  //                         {liContent}
  //                       </SkillBar>
  //                     </div>
  //                     {li}
  //                   </li>
  //   let ul = <ul className={styles.unorderedList}></ul>
  //   let li = <li className={styles.listElement}>
  //               <div className={styles.listElementContainer} onClick={(event) => showModal(event)}>
  //                 <SkillBar progressPercentage={progressPercentage}>
  //                   {liContent}
  //                 </SkillBar>
  //               </div>
  //             </li>
  //   const skillsetPerDepthLevel = []
  //   for (const skill of [liContent, progressPercentage, nesting]) {
  //     if (!nesting) {
  //       skillsetPerDepthLevel.push(li);
  //     } else {

  //     }
  //   }
  // }

// It is necessary to use the "useMemo()" hook in order to avoid re-renders on the progress bars 
// whenever the "useState()" hook is updated.
  const skills = useMemo(() => {
    return (
      <>
        <SkillsBlock additionalStyles={styles.HTMLSkillsBlock}>
          <ul className={`${styles.unorderedList} ${styles.mainUnorderedList}`}>
            <li className={`${styles.listElement} ${styles.firstListElement}`}><div className={`${styles.listElementContainer} ${styles.firstListElementContainer}`} onClick={(event) => showModal(event)}><SkillBar progressPercentage='90'>{tech.HTML}</SkillBar></div>
              <ul className={styles.unorderedList}>
                <li className={styles.listElement}><div className={styles.listElementContainer} onClick={(event) => showModal(event)}><SkillBar progressPercentage='55'>{tech.ACCESIBILITY}</SkillBar></div></li>
                <li className={styles.listElement}><div className={styles.listElementContainer} onClick={(event) => showModal(event)}><SkillBar progressPercentage='70'>{tech.SEO}</SkillBar></div></li>
              </ul>
            </li>
          </ul>
        </SkillsBlock>
        <SkillsBlock additionalStyles={styles.CSSSkillsBlock}>
          <ul className={`${styles.unorderedList} ${styles.mainUnorderedList}`}>
            <li className={`${styles.listElement} ${styles.firstListElement}`}><div className={`${styles.listElementContainer} ${styles.firstListElementContainer}`} onClick={(event) => showModal(event)}><SkillBar progressPercentage='90'>{tech.CSS}</SkillBar></div>
              <ul className={styles.unorderedList}>
                <li className={styles.listElement}><div className={styles.listElementContainer} onClick={(event) => showModal(event)}><SkillBar progressPercentage='75'>{tech.SASS}</SkillBar></div></li>
                <li className={styles.listElement}><div className={styles.listElementContainer} onClick={(event) => showModal(event)}><SkillBar progressPercentage='50'>{tech.UXandUI}</SkillBar></div></li>
              </ul>
            </li>
          </ul>
        </SkillsBlock>
        <SkillsBlock additionalStyles={styles.JavaScriptSkillsBlock}>
          <ul className={`${styles.unorderedList} ${styles.mainUnorderedList}`}>
            <li className={`${styles.listElement} ${styles.firstListElement}`}><div className={`${styles.listElementContainer} ${styles.firstListElementContainer}`} onClick={(event) => showModal(event)}><SkillBar progressPercentage='90'>{tech.JAVASCRIPT}</SkillBar></div>
              <ul className={styles.unorderedList}>
                <li className={styles.listElement}><div className={styles.listElementContainer} onClick={(event) => showModal(event)}><SkillBar progressPercentage='80'>{tech.TYPESCRIPT}</SkillBar></div></li>
                <li className={styles.listElement}><div className={styles.listElementContainer} onClick={(event) => showModal(event)}><SkillBar progressPercentage='75'>{tech.REACT}</SkillBar></div>
                  <ul className={styles.unorderedList}>
                    <li className={styles.listElement}><div className={styles.listElementContainer} onClick={(event) => showModal(event)}><SkillBar progressPercentage='70'>{tech.REDUX}</SkillBar></div></li>
                    <li className={styles.listElement}><div className={styles.listElementContainer} onClick={(event) => showModal(event)}><SkillBar progressPercentage='80'>{tech.NEXT}</SkillBar></div></li>
                  </ul>
                </li>
                <li className={styles.listElement}><div className={styles.listElementContainer} onClick={(event) => showModal(event)}><SkillBar progressPercentage='60'>{tech.JEST}</SkillBar></div></li>
              </ul>
            </li>
          </ul>
        </SkillsBlock>
      </>
    )
  }, [])

  return (
    <>
      <Head>
        <title>Skills - JM2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.positionMainElements}>
        <main className={styles.MainContainer}>
          <nav className={styles.TopNavBar}>
              <NavBarTopButton link="/skills/frontend">Front-End</NavBarTopButton>
              {/* <NavBarTopButton link="/skills/devops">DevOps</NavBarTopButton> */}
              <NavBarTopButton link="/skills/backend">Back-End</NavBarTopButton>
          </nav>
          {skills}
          <SkillModal 
            showingModal={modalIsShown}
            closeFromOuterModal={() => closeModal()}
            stopPropagation={event => event.stopPropagation()}
            closeFromButton={() => closeModal()}
            title={currentTechnology.name}
            description={currentTechnology.description}
          />
        </main>
        <NavBarBottom />
      </div>
    </>
  )
}