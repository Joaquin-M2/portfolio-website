import styles from './service-card.module.scss';

import MainButton from '../../Common/Main button/main-button';

interface ServiceCardProps {
  frontBackgroundImageWithGradientStyle: string;
  backBackgroundColorWithGradientStyle: string;
  headingSpanGradientStyle: string;
  title: string;
  price: string;
  aimingPopup: string;
  children: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = (props) => {
  const setListOfDetails = () => {
    const details = [];
    for (let i = 0; i < props.children.length; i++) {
      details.push(<li key={i}>{props.children[i]}</li>);
    }
    return details;
  };

  return (
    <div className={styles.card}>
      <div className={`${styles.side} ${styles.front}`}>
        <div
          className={`${styles.picture} ${props.frontBackgroundImageWithGradientStyle}`}
        >
          &nbsp;
        </div>
        <h4 className={styles.heading}>
          <span
            className={`${styles.headingSpan} ${props.headingSpanGradientStyle}`}
          >
            {props.title}
          </span>
        </h4>
        <div className={styles.details}>
          <ul>{setListOfDetails()}</ul>
        </div>
      </div>
      <div
        className={`${styles.side} ${styles.back} ${props.backBackgroundColorWithGradientStyle}`}
      >
        <div className={styles.cta}>
          <div className={styles.priceBox}>
            <p className={styles.priceOnly}>From</p>
            <p className={styles.priceValue}>{props.price}</p>
          </div>
          <MainButton
            aimingSection={props.aimingPopup}
            additionalStyles={styles.whiteMainButton}
          >
            Book now!
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
