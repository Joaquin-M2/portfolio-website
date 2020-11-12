import styles from './form.module.scss';

import SectionTitle from '../../../Common/Section title/section-title';
import MainButton from '../../../Common/Main button/main-button';

const Form: React.FC = () => {
  return (
    <div className={styles.formContainer}>
      <form action="#" className={styles.form}>
        <SectionTitle additionalStyles={styles.title}>
          Book your session
        </SectionTitle>
        <div className={styles.formGroup}>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Full name"
            id="name"
            required
          />
          <label htmlFor="name" className={styles.formLabel}>
            Full name
          </label>
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            className={styles.formInput}
            placeholder="Email address"
            id="email"
            required
          />
          <label htmlFor="email" className={styles.formLabel}>
            Email address
          </label>
        </div>

        <div className={`${styles.formGroup} ${styles.marginBottom}`}>
          <div className={styles.formRadioGroup}>
            <input
              type="radio"
              className={styles.formRadioInput}
              id="tattoo"
              name="size"
            />
            <label htmlFor="tattoo" className={styles.formRadioLabel}>
              <span className={styles.formRadioButton}></span>
              Tattoo
            </label>
          </div>

          <div className={styles.formRadioGroup}>
            <input
              type="radio"
              className={styles.formRadioInput}
              id="piercing"
              name="size"
            />
            <label htmlFor="piercing" className={styles.formRadioLabel}>
              <span className={styles.formRadioButton}></span>
              Piercing
            </label>
          </div>

          <div className={styles.formRadioGroup}>
            <input
              type="radio"
              className={styles.formRadioInput}
              id="removal"
              name="size"
            />
            <label htmlFor="removal" className={styles.formRadioLabel}>
              <span className={styles.formRadioButton}></span>
              Removal
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <MainButton
            aimingSection="#"
            additionalStyles={styles.greenMainButton}
          >
            Next step &rarr;
          </MainButton>
        </div>
      </form>
    </div>
  );
};

export default Form;
