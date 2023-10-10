'use client';

import { useMemo, useState } from 'react';

import SkillsBlock from '../../../components/SkillsBlock/SkillsBlock';
import SkillBar from '../../../components/SkillsBlock/SkillBar/SkillBar';
import SkillModal from '../../../components/SkillsBlock/SkillModal/SkillModal';

import tech from '../../../data/techs-names';
import technologies from '../../../data/skills-backend';

import stylesBackendPage from './backendPage.module.scss';
import styles from '../skills.module.scss';

function Page() {
  const [technology, setTechnology] = useState(tech.SQL);
  const [modalIsShown, setModalIsShown] = useState(false);
  function showModal(event) {
    setModalIsShown(true);

    setTechnology(event.target.closest('li').querySelector('span').textContent);
  }

  function closeModal() {
    setModalIsShown(false);
  }

  const currentTechnology = technologies.find(
    (tech) => tech.name === technology
  );

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
        <SkillsBlock additionalStyles={styles.SQLSkillsBlock}>
          <ul className={`${styles.unorderedList} ${styles.mainUnorderedList}`}>
            <li className={`${styles.listElement} ${styles.firstListElement}`}>
              <div
                className={`${styles.listElementContainer} ${styles.firstListElementContainer}`}
                onClick={(event) => showModal(event)}
              >
                <SkillBar progressPercentage={65}>{tech.SQL}</SkillBar>
              </div>
              <ul className={styles.unorderedList}>
                <li className={styles.listElement}>
                  <div
                    className={styles.listElementContainer}
                    onClick={(event) => showModal(event)}
                  >
                    <SkillBar progressPercentage={80}>{tech.NODEJS}</SkillBar>
                  </div>
                  <ul className={styles.unorderedList}>
                    <li className={styles.listElement}>
                      <div
                        className={styles.listElementContainer}
                        onClick={(event) => showModal(event)}
                      >
                        <SkillBar progressPercentage={70}>
                          {tech.EXPRESS}
                        </SkillBar>
                      </div>
                    </li>
                    <li className={styles.listElement}>
                      <div
                        className={styles.listElementContainer}
                        onClick={(event) => showModal(event)}
                      >
                        <SkillBar progressPercentage={65}>
                          {tech.SEQUELIZE}
                        </SkillBar>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </SkillsBlock>
        <SkillsBlock additionalStyles={styles.NoSQLSkillsBlock}>
          <ul className={`${styles.unorderedList} ${styles.mainUnorderedList}`}>
            <li className={`${styles.listElement} ${styles.firstListElement}`}>
              <div
                className={`${styles.listElementContainer} ${styles.firstListElementContainer}`}
                onClick={(event) => showModal(event)}
              >
                <SkillBar progressPercentage={65}>{tech.NOSQL}</SkillBar>
              </div>
              <ul className={styles.unorderedList}>
                <li className={styles.listElement}>
                  <div
                    className={styles.listElementContainer}
                    onClick={(event) => showModal(event)}
                  >
                    <SkillBar progressPercentage={80}>{tech.NODEJS}</SkillBar>
                  </div>
                  <ul className={styles.unorderedList}>
                    <li className={styles.listElement}>
                      <div
                        className={styles.listElementContainer}
                        onClick={(event) => showModal(event)}
                      >
                        <SkillBar progressPercentage={70}>
                          {tech.EXPRESS}
                        </SkillBar>
                      </div>
                    </li>
                    <li className={styles.listElement}>
                      <div
                        className={styles.listElementContainer}
                        onClick={(event) => showModal(event)}
                      >
                        <SkillBar progressPercentage={65}>
                          {tech.MONGOOSE}
                        </SkillBar>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </SkillsBlock>
      </>
    );
  }, []);

  return (
    <>
      <div className={stylesBackendPage.positionMainElements}>
        <main className={stylesBackendPage.MainContainer}>
          {skills}
          <SkillModal
            showingModal={modalIsShown}
            closeFromOuterModal={() => closeModal()}
            stopPropagation={(event) => event.stopPropagation()}
            closeFromButton={() => closeModal()}
            title={currentTechnology.name}
            description={currentTechnology.description}
          />
        </main>
      </div>
    </>
  );
}

export default Page;
