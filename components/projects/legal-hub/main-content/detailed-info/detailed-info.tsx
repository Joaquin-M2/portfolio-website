import styles from './detailed-info.module.scss';

import Description from './description/description';
import Reviews from './reviews/reviews';

const DetailedInfo: React.FC = () => {
  return (
    <div className={styles.container}>
      <Description />
      <Reviews />
    </div>
  );
};

export default DetailedInfo;
