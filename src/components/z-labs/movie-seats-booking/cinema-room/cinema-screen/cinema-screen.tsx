import styles from './cinema-screen.module.scss';

interface CinemaScreenProps {
    children: string;
}

const CinemaScreen: React.FC<CinemaScreenProps> = (props) => {
    return <div className={styles.screen}>{props.children}</div>;
};

export default CinemaScreen;
