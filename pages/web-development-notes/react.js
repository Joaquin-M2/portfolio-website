import Head from 'next/head';

import NavBarBottom from '../../components/projects/portfolio-website/nav-bar-bottom/nav-bar-bottom';

import LeftPanel from '../../components/projects/portfolio-website/wd-notes/left-panel/left-panel';
import RightPanel from '../../components/projects/portfolio-website/wd-notes/right-panel/right-panel';
import CorePanel from '../../components/projects/portfolio-website/wd-notes/core-panel/core-panel';

import styles from './wd-notes.module.scss';

export default function WDNotes() {
  return (
    <>
      <Head>
        <title>Web Development notes: React - JM2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className={styles.MainContainer}>
          <div className={styles.LeftAndCorePanels}>
            <LeftPanel additionalStyles={styles.LeftPanel} />
            <CorePanel additionalStyles={styles.CorePanel}>
            <h1>What is this?</h1>
              <p>These web development notes are the public version of my own notes, which I took during the time I have been learning the necessary skills to become a full-stack developer.</p>
              <p>Don&rsquo;t expect an extraordinary resource of wisdom, since they are just some of my personal notes. Nevertheless, I hope they are still useful enough for somebody beyond myself.</p>
              <p>There are many people out there who altruistically shared their knowledge with people like me who, one day, decided to follow the path of becoming a web developer. I hope this is a way I have to pay back my debt with the community, helping others to succeed fulfilling their dreams in the web development field.</p>
              <p>Please, note that since my mother tongue is Spanish, my notes were taken in this language. Nevertheless, I tried to write them down in the most correct Spanish I could, so the output of online tools such as Google Translator or DeepL should be accurate enough.</p>
            </CorePanel>
          </div>
          <RightPanel additionalStyles={styles.RightPanel} />
        </main>
        <NavBarBottom />
    </>
  )
}