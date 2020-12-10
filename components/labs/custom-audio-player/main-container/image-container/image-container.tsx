import styles from './image-container.module.scss';

interface ImageContainerProps {
  spin: boolean;
  songImage: string;
  songName: string;
}

const ImageContainer: React.FC<ImageContainerProps> = props => {
  return (
    <div className={`${styles.container} ${props.spin ? styles.spin : null}`}>
      <img
        src={props.songImage}
        alt={`Cover image of the ${props.songName} song`}
        className={styles.image}
      />
    </div>
  );
};

export default ImageContainer;
