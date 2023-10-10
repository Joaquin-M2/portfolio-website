import styles from './popup.module.scss';

import MainButton from '../../Common/Main button/main-button';
import SectionTitle from '../../Common/Section title/section-title';

interface PopupProps {
  id: string;
  mainTitle: string;
  secondaryTitle: string;
  pathImg_1: string;
  altImg_1: string;
  pathImg_2: string;
  altImg_2: string;
  children: string;
}

const Popup: React.FC<PopupProps> = (props) => {
  return (
    <div className={styles.container} id={props.id}>
      <div className={styles.infoContainer}>
        <div className={styles.leftSide}>
          <img
            src={props.pathImg_1}
            alt={props.altImg_1}
            className={styles.image}
          />
          <img
            src={props.pathImg_2}
            alt={props.altImg_2}
            className={styles.image}
          />
        </div>
        <div className={styles.rightSide}>
          <a href="#services-section" className={styles.closeButton}>
            &times;
          </a>
          <SectionTitle additionalStyles={styles.mainTitle}>
            {props.mainTitle}
          </SectionTitle>
          <h3 className={styles.secondaryTitle}>{props.secondaryTitle}</h3>
          <p className={styles.text}>{props.children}</p>
          <MainButton aimingSection="#" additionalStyles={styles.actionButton}>
            Book now
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default Popup;
