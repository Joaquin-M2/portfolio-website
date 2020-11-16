import styles from './review.module.scss';

import AvatarImage from '../../../../common/avatar-image/avatar-image';

interface ReviewProps {
  children: string;
  avatarImagePath: string;
  avatarImageAltText: string;
  userName: string;
  date: string | Date;
  rating: string | number;
}

const Review: React.FC<ReviewProps> = props => {
  return (
    <figure className={styles.container}>
      <blockquote className={styles.text}>{props.children}</blockquote>
      <figcaption className={styles.userDetails}>
        <AvatarImage
          src={props.avatarImagePath}
          alt={props.avatarImageAltText}
          additionalStyles={styles.userPicture}
        />
        <div className={styles.userNameAndDate_container}>
          <p className={styles.userNameAndDate_name}>{props.userName}</p>
          <p className={styles.userNameAndDate_date}>{props.date}</p>
        </div>
        <p className={styles.userRating}>{props.rating}</p>
      </figcaption>
    </figure>
  );
};

export default Review;
