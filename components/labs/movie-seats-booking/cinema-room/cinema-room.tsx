import styles from './cinema-room.module.scss';
import CinemaScreen from './cinema-screen/cinema-screen';

interface CinemaRoomProps {
    MovieNameOnScreen: string;
    children: JSX.Element[];
}

const CinemaRoom: React.FC<CinemaRoomProps> = (props) => {
    return (
        <div className={styles.cinemaRoom}>
            <CinemaScreen>{props.MovieNameOnScreen}</CinemaScreen>
            {props.children}
        </div>
    );
};

export default CinemaRoom;
