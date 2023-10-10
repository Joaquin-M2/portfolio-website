import styles from './contact-card.module.scss';

import Form from './form/form';

const ContactCard: React.FC = () => {
  return (
    <div className={styles.container}>
      <Form />
    </div>
  );
};

export default ContactCard;
