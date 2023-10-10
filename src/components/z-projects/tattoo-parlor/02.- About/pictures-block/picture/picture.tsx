import styles from './picture.module.scss';

interface DemoPictureProps {
  imgSrcSet: string;
  imgAlt: string;
  imgSrc: string;
  additionalStyles: string;
}

const DemoPicture: React.FC<DemoPictureProps> = (props) => {
  return (
    <img
      srcSet={props.imgSrcSet}
      sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
      alt={props.imgAlt}
      className={`${styles.picture} ${props.additionalStyles}`}
      src={props.imgSrc}
    />
  );
};

export default DemoPicture;
