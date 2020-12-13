import styles from './Picture.module.scss';

interface PictureProps {
  img: string;
}

const Picture: React.FC<PictureProps> = props => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={props.img} />
    </div>
  );
};

export default Picture;
