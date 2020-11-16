import styles from './image.module.scss';

interface ImageProps {
  srcSet: string;
  src: string;
  alt: string;
  additionalStyles?: string;
}

const Image: React.FC<ImageProps> = props => {
  return (
    <figure className={styles.imageContainer}>
      <img
        className={`${styles.image} ${props.additionalStyles}`}
        srcSet={props.srcSet}
        sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
        src={props.src}
        alt={props.alt}
      />
    </figure>
  );
};

export default Image;
