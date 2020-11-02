import styles from './tonguesContainer.module.scss';

import CheckCodeTag from './tongues/check-code';
import ReturnTag from './tongues/return';

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
