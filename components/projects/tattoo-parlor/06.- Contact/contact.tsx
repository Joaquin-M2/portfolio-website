import styles from './contact.module.scss';

import ContactCard from './contact-card/contact-card';

interface ContactProps {
  id: string;
}

const Contact: React.FC<ContactProps> = (props) => {
  return (
    <section className={styles.sectionContact} id={props.id}>
      <ContactCard />
    </section>
  );
};

export default Contact;
