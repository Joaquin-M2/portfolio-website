import styles from './gallery.module.scss';

import Image from './image/image';

const Gallery: React.FC = () => {
  return (
    <div className={styles.container}>
      <Image
        srcSet="/projects/LegalHub/lawyer-1.jpg 600w, /projects/LegalHub/lawyer-1-small.jpg 300w"
        src="/projects/LegalHub/lawyer-1.jpg"
        alt="Picture lawyer 1"
      />
      <Image
        srcSet="/projects/LegalHub/lawyer-2.jpg 600w, /projects/LegalHub/lawyer-2-small.jpg 300w"
        src="/projects/LegalHub/lawyer-2.jpg"
        alt="Picture lawyer 2"
      />
      <Image
        srcSet="/projects/LegalHub/lawyer-3.jpg 600w, /projects/LegalHub/lawyer-3-small.jpg 300w"
        src="/projects/LegalHub/lawyer-3.jpg"
        alt="Picture lawyer 3"
      />
    </div>
  );
};

export default Gallery;
