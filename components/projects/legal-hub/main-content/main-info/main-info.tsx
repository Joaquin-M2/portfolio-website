import styles from './main-info.module.scss';

import GavelIcon from '../../../../SVG-icons/portfolio/projects/LegalHub/MainInfo/gavel';
import LocationIcon from '../../../../SVG-icons/portfolio/projects/LegalHub/MainInfo/location';
import ButtonInline from '../../common/button-inline/button-inline';

const MainInfo: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Soriano & Pacheco, International Lawyers</h1>
      </div>
      <div className={styles.rating}>
        <GavelIcon additionalStyles={styles.ratingIcon} />
        <GavelIcon additionalStyles={styles.ratingIcon} />
        <GavelIcon additionalStyles={styles.ratingIcon} />
        <GavelIcon additionalStyles={styles.ratingIcon} />
        <GavelIcon emptyGavel={true} />
      </div>
      <div className={styles.location}>
        <LocationIcon additionalStyles={styles.locationIcon} />
        <ButtonInline>Madrid, Spain</ButtonInline>
      </div>
      <div className={styles.overallRating}>
        <div className={styles.meanRating}>7.9</div>
        <div className={styles.totalVotes}>102 votes</div>
      </div>
    </div>
  );
};

export default MainInfo;
