import CheckCodeTag from './Tongues/CheckCode';
import ReturnTag from './Tongues/Return';

import styles from './tonguesContainer.module.scss';

interface TonguesContainerProps {
  CheckCodePath: string;
}

const TonguesContainer: React.FC<TonguesContainerProps> = (props) => {
  return (
    <div className={styles.container}>
      <CheckCodeTag GithubPath={props.CheckCodePath} />
      <ReturnTag />
    </div>
  );
};

export default TonguesContainer;
