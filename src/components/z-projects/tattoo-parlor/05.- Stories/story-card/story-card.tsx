import styles from './story-card.module.scss';

interface StoryCardProps {
  clientName: string;
  title: string;
  imgPath: string;
  imgAlt: string;
  children: string;
}

const StoryCard: React.FC<StoryCardProps> = (props) => {
  return (
    <div className={styles.card}>
      <figure className={styles.pictureContainerShape}>
        <img
          src={props.imgPath}
          alt={props.imgAlt}
          className={styles.picture}
        />
        <figcaption className={styles.pictureCaption}>
          {props.clientName}
        </figcaption>
      </figure>
      <div className={styles.text}>
        <h3 className={styles.title}>{props.title}</h3>
        <p>{props.children}</p>
      </div>
    </div>
  );
};

export default StoryCard;
