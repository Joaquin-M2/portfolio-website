import styles from './recommendations.module.scss';

import AvatarImage from '../../../../common/avatar-image/avatar-image';

const Recommendations: React.FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.textLine}>
        Miriam and 13 other clients recommend this law firm.
      </p>
      <div className={styles.avatarsContainer}>
        <AvatarImage
          stackedAvatar
          src="/projects/LegalHub/user-3.jpg"
          alt="User 3"
        />
        <AvatarImage
          stackedAvatar
          src="/projects/LegalHub/user-4.jpg"
          alt="User 4"
        />
        <AvatarImage
          stackedAvatar
          src="/projects/LegalHub/user-5.jpg"
          alt="User 5"
        />
        <AvatarImage
          stackedAvatar
          src="/projects/LegalHub/user-6.jpg"
          alt="User 6"
        />
      </div>
    </div>
  );
};

export default Recommendations;
