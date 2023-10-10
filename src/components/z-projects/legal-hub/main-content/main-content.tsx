import styles from './main-content.module.scss';

import Gallery from './gallery/gallery';
import MainInfo from './main-info/main-info';
import DetailedInfo from './detailed-info/detailed-info';
import CTA from './call-to-action/cta';

const MainContent: React.FC = () => {
  return (
    <main className={styles.container}>
      <Gallery />
      <MainInfo />
      <DetailedInfo />
      <CTA />
    </main>
  );
};

export default MainContent;
