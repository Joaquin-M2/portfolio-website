import styles from './movies-container.module.scss';

interface MoviesContainerProps {
    UseRefHook: React.MutableRefObject<HTMLSelectElement>;
    OnChangeEvent: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MoviesContainer: React.FC<MoviesContainerProps> = (props) => {
    return (
        <div className={styles.moviesContainer}>
            <label>Pick a movie:</label>
            <select
                className={styles.select}
                ref={props.UseRefHook}
                onChange={props.OnChangeEvent}
            >
                <option value="8">The Lion King</option>
                <option value="9">Toy Story 4</option>
                <option value="10">Avengers: Endgame</option>
                <option value="12">Joker</option>
            </select>
        </div>
    );
};

export default MoviesContainer;
