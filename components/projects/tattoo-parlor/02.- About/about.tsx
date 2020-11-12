import styles from './about.module.scss';

import SectionTitle from '../Common/Section title/section-title';
import Description from './description/description';
import PicturesBlock from './pictures-block/pictures-block';

interface AboutProps {
  id: string;
}

const About: React.FC<AboutProps> = (props) => {
  return (
    <section className={styles.container} id={props.id}>
      <SectionTitle>About Us</SectionTitle>
      <div className={styles.subsectionContainer}>
        <Description />
        <PicturesBlock />
      </div>
    </section>
  );
};

export default About;
