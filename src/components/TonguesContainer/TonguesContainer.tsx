import Tongue from "./Tongue/Tongue";

import styles from "./tonguesContainer.module.scss";

interface TonguesContainerProps {
  checkCodePath: string;
}

const TonguesContainer = ({ checkCodePath }: TonguesContainerProps) => {
  return (
    <div className={styles.container}>
      <Tongue isGithubLink githubPath={checkCodePath} />
      <Tongue />
    </div>
  );
};

export default TonguesContainer;
