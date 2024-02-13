import styles from "./footer.module.scss";

import Button from "./block-info/button/button";
import BlockInfo from "./block-info/block-info";
import TP_Isotype from "@/components/SVG-icons/portfolio/projects/TattooParlor/isotype";
import TP_Logotype from "@/components/SVG-icons/portfolio/projects/TattooParlor/logotype";

import projectsData from "@/data/projects";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoBox}>
        <TP_Isotype additionalStyles={styles.isotype} />
        <TP_Logotype additionalStyles={styles.logotype} />
      </div>
      <div className={styles.blocksContainer}>
        <BlockInfo additionalStyles={styles.navBlock}>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Button path="#">Company</Button>
            </li>
            <li className={styles.listItem}>
              <Button path="#">Contact us</Button>
            </li>
            <li className={styles.listItem}>
              <Button path="#">Careers</Button>
            </li>
            <li className={styles.listItem}>
              <Button path="#">Privacy policy</Button>
            </li>
            <li className={styles.listItem}>
              <Button path="#">Terms</Button>
            </li>
          </ul>
        </BlockInfo>
        <BlockInfo additionalStyles={styles.copyrightBlock}>
          <p className={styles.copyright}>
            Built by{" "}
            <Button path="https://www.linkedin.com/in/joaquin-m2/">
              Joaquín M2
            </Button>
            . <br />
            Design inspired by Jonas Schmedtmann "Natours" project. <br />
            Feel free to{" "}
            <Button
              path={
                projectsData.find(
                  (project) => project.title === "Tattoo Parlor"
                ).linkToCode
              }
            >
              check the code
            </Button>
            .
          </p>
        </BlockInfo>
      </div>
    </footer>
  );
};

export default Footer;
