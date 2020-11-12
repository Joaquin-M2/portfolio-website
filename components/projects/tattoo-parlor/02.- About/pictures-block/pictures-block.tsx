import styles from './pictures-block.module.scss';

import DemoPicture from './picture/picture';

const PicturesBlock: React.FC = () => {
  return (
    <div className={styles.container}>
      <DemoPicture
        additionalStyles={styles.pictureOne}
        imgSrcSet="/projects/TattooParlor/About/tattoo-creation.jpg 300w, /projects/TattooParlor/About/tattoo-creation-big.jpg 1000w"
        imgSrc="/projects/TattooParlor/About/tattoo-creation-big.jpg"
        imgAlt="Tattoo picture #1"
      />
      <DemoPicture
        additionalStyles={styles.pictureTwo}
        imgSrcSet="/projects/TattooParlor/About/piercing-top-nose.jpg 300w, /projects/TattooParlor/About/piercing-top-nose-big.jpg 1000w"
        imgSrc="/projects/TattooParlor/About/piercing-top-nose-big.jpg"
        imgAlt="Piercing picture #2"
      />
      <DemoPicture
        additionalStyles={styles.pictureThree}
        imgSrcSet="/projects/TattooParlor/About/tattoo-studio.jpg 300w, /projects/TattooParlor/About/tattoo-creation-big.jpg 1000w"
        imgSrc="/projects/TattooParlor/About/tattoo-studio-big.jpg"
        imgAlt="Tattoo picture #3"
      />
    </div>
  );
};

export default PicturesBlock;
