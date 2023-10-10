import styles from './services.module.scss';

import Popup from './popup/popup';

import SectionTitle from '../Common/Section title/section-title';
import ServiceCard from './service-card/service-card';
import MainButton from '../Common/Main button/main-button';

interface ServicesProps {
  id: string;
}

const Services: React.FC<ServicesProps> = props => {
  return (
    <section className={styles.container} id={props.id}>
      <SectionTitle>Our Main Services</SectionTitle>
      <div className={styles.cardsContainer}>
        <ServiceCard
          title="Tattooing"
          price="$49"
          headingSpanGradientStyle={styles.headingCard_1}
          frontBackgroundImageWithGradientStyle={styles.frontCardImage_1}
          backBackgroundColorWithGradientStyle={styles.backCard_1}
          aimingPopup="#popup_1"
        >
          {['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']}
        </ServiceCard>
        <ServiceCard
          title="Piercing"
          price="$29"
          headingSpanGradientStyle={styles.headingCard_2}
          frontBackgroundImageWithGradientStyle={styles.frontCardImage_2}
          backBackgroundColorWithGradientStyle={styles.backCard_2}
          aimingPopup="#popup_2"
        >
          {['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']}
        </ServiceCard>
        <ServiceCard
          title="Removal"
          price="$99"
          headingSpanGradientStyle={styles.headingCard_3}
          frontBackgroundImageWithGradientStyle={styles.frontCardImage_3}
          backBackgroundColorWithGradientStyle={styles.backCard_3}
          aimingPopup="#popup_3"
        >
          {['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']}
        </ServiceCard>
      </div>
      <MainButton aimingSection="#" additionalStyles={styles.discoverButton}>
        Discover our services
      </MainButton>
      <Popup
        id="popup_1"
        mainTitle="Popup Service 1"
        secondaryTitle="Título secundario. Prueba popup 1."
        pathImg_1="/projects/tattoo-parlor/tattoo-card/tattoo-1.jpg"
        pathImg_2="/projects/tattoo-parlor/tattoo-card/tattoo-2.jpg"
        altImg_1="Tour photo 1"
        altImg_2="Tour photo 2"
      >
        1111 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed sed
        risus pretium quam. Aliquam sem et tortor consequat id. Volutpat odio
        facilisis mauris sit amet massa vitae. Mi bibendum neque egestas congue.
        Placerat orci nulla pellentesque dignissim enim sit. Vitae semper quis
        lectus nulla at volutpat diam ut venenatis. Malesuada pellentesque elit
        eget gravida cum sociis natoque penatibus et. Proin fermentum leo vel
        orci porta non pulvinar neque laoreet. Gravida neque convallis a cras
        semper. Molestie at elementum eu facilisis sed odio morbi quis. Faucibus
        vitae aliquet nec ullamcorper sit amet risus nullam eget. Nam libero
        justo laoreet sit. Amet massa vitae tortor condimentum lacinia quis vel
        eros donec. Sit amet facilisis magna etiam. Imperdiet sed euismod nisi
        porta.
      </Popup>
      <Popup
        id="popup_2"
        mainTitle="Popup Service 2"
        secondaryTitle="Important &ndash; Please read these terms before booking"
        pathImg_1="/projects/tattoo-parlor/piercing-card/piercing-studio.jpg"
        pathImg_2="/projects/tattoo-parlor/piercing-card/piercing-tongue.jpg"
        altImg_1="Tour photo 1"
        altImg_2="Tour photo 2"
      >
        2222 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed sed
        risus pretium quam. Aliquam sem et tortor consequat id. Volutpat odio
        facilisis mauris sit amet massa vitae. Mi bibendum neque egestas congue.
        Placerat orci nulla pellentesque dignissim enim sit. Vitae semper quis
        lectus nulla at volutpat diam ut venenatis. Malesuada pellentesque elit
        eget gravida cum sociis natoque penatibus et. Proin fermentum leo vel
        orci porta non pulvinar neque laoreet. Gravida neque convallis a cras
        semper. Molestie at elementum eu facilisis sed odio morbi quis. Faucibus
        vitae aliquet nec ullamcorper sit amet risus nullam eget. Nam libero
        justo laoreet sit. Amet massa vitae tortor condimentum lacinia quis vel
        eros donec. Sit amet facilisis magna etiam. Imperdiet sed euismod nisi
        porta.
      </Popup>
      <Popup
        id="popup_3"
        mainTitle="Popup Service 3"
        secondaryTitle="Título secundario del popup 3"
        pathImg_1="/projects/tattoo-parlor/tattoo-removal-card/tattoo-removal-2.jpg"
        pathImg_2="/projects/tattoo-parlor/tattoo-removal-card/tattoo-removal-1.jpg"
        altImg_1="Tour photo 1"
        altImg_2="Tour photo 2"
      >
        3333 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed sed
        risus pretium quam. Aliquam sem et tortor consequat id. Volutpat odio
        facilisis mauris sit amet massa vitae. Mi bibendum neque egestas congue.
        Placerat orci nulla pellentesque dignissim enim sit. Vitae semper quis
        lectus nulla at volutpat diam ut venenatis. Malesuada pellentesque elit
        eget gravida cum sociis natoque penatibus et. Proin fermentum leo vel
        orci porta non pulvinar neque laoreet. Gravida neque convallis a cras
        semper. Molestie at elementum eu facilisis sed odio morbi quis. Faucibus
        vitae aliquet nec ullamcorper sit amet risus nullam eget. Nam libero
        justo laoreet sit. Amet massa vitae tortor condimentum lacinia quis vel
        eros donec. Sit amet facilisis magna etiam. Imperdiet sed euismod nisi
        porta.
      </Popup>
    </section>
  );
};

export default Services;
