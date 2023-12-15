import Tongue from "./Tongue/Tongue";

import styles from "./tonguesContainer.module.scss";

interface TonguesContainerProps {
  CheckCodePath: string;
}

const TonguesContainer = ({ CheckCodePath }: TonguesContainerProps) => {
  return (
    <div className={styles.container}>
      <Tongue isGithubLink githubPath={CheckCodePath} />
      <Tongue />
    </div>
  );
};

export default TonguesContainer;
