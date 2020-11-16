import Head from 'next/head';

import styles from './legal-hub.module.scss';

import TopBar from '../../../../components/projects/legal-hub/top-bar/top-bar';
import NavSidebar from '../../../../components/projects/legal-hub/nav-sidebar/nav-sidebar';
import MainContent from '../../../../components/projects/legal-hub/main-content/main-content';

import TonguesContainer from '../../../../components/common/tongues-container/tonguesContainer';

const LegalHubProject: React.FC = () => {
  return (
    <>
      <Head>
        <title>Portfolio JM2: Projects - Legal Hub</title>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/projects/LegalHub/legal-hub_favicon.png" />
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <TopBar />
          <div className={styles.content}>
            <NavSidebar />
            <MainContent />
          </div>
        </div>
      </div>
      <TonguesContainer CheckCodePath="https://github.com/Joaquin-M2/portfolio-website/blob/master/pages/portfolio/projects/legal-hub/index.tsx" />
    </>
  );
};

export default LegalHubProject;
