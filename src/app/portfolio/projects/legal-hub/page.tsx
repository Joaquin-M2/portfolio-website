import TopBar from "@/components/z-projects/legal-hub/top-bar/top-bar";
import NavSidebar from "@/components/z-projects/legal-hub/nav-sidebar/nav-sidebar";
import MainContent from "@/components/z-projects/legal-hub/main-content/main-content";

import TonguesContainer from "@/components/TonguesContainer/TonguesContainer";

import styles from "./legal-hub.module.scss";

const Page: React.FC = () => {
  return (
    <>
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

export default Page;
