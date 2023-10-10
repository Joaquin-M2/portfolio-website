import GithubLogo from '../../SVG-icons/github';

import styles from './tongues.module.scss';

interface CheckCodeTongueProps {
  GithubPath: string;
}

const CheckCodeTongue = (props: CheckCodeTongueProps) => {
  return (
    <a className={styles.link} href={props.GithubPath} target='_blank'>
      <div className={`${styles.container} ${styles.github}`}>
        <div className={styles.icon}>
          <GithubLogo />
        </div>
        <div className={styles.text}>Check the code</div>
      </div>
    </a>
  );
};

export default CheckCodeTongue;
