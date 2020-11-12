import Benefits from '../benefits';
import styles from './benefit-card.module.scss';

interface BenefitCardProps {
  title: string;
  icon: JSX.Element;
  children: string;
}

const BenefitCard: React.FC<BenefitCardProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{props.icon}</div>
      {/* <i className="feature-box__icon icon-basic-world"></i> */}
      <h3 className={styles.title}>{props.title}</h3>
      <p className={styles.text}>{props.children}</p>
    </div>
  );
};

export default BenefitCard;
