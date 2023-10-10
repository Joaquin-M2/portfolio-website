import styles from './reviews.module.scss';

import Review from './review/review';
import ButtonInline from '../../../common/button-inline/button-inline';

const Reviews: React.FC = () => {
  return (
    <div className={styles.container}>
      <Review
        avatarImagePath="/projects/legal-hub/user-1.jpg"
        avatarImageAltText="User 1"
        userName="Felipe Núñez"
        date="June 24th, 2020"
        rating="9.0"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga
        doloremque architecto dicta animi, totam, itaque officia ex.
      </Review>
      <Review
        avatarImagePath="/projects/legal-hub/user-2.jpg"
        avatarImageAltText="User 2"
        userName="Olga Zhukova"
        date="January 29th, 2020"
        rating="7.5"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga
        doloremque architecto dicta animi.
      </Review>
      <ButtonInline>
        Show all <span>&rarr;</span>
      </ButtonInline>
    </div>
  );
};

export default Reviews;
