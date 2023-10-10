import styles from './seats-legend.module.scss';

const SeatsLegend: React.FC = () => {
    return (
        <ul className={styles.seatsLegend}>
            <li>
                <div className={`${styles.seat} ${styles.free}`}></div>
                <p>N/A</p>
            </li>
            <li>
                <div className={`${styles.seat} ${styles.selected}`}></div>
                <p>Selected</p>
            </li>
            <li>
                <div className={`${styles.seat} ${styles.occupied}`}></div>
                <p>Occupied</p>
            </li>
        </ul>
    );
};

export default SeatsLegend;
